import React, { useState, useEffect } from "react"
import "moment-timezone"
import moment from "moment"
import createPersistedState from "use-persisted-state"
import { useWindowSize } from '@react-hook/window-size'
import { sortBy } from 'lodash';

import { Tag, Drawer, Typography, Row, Col, Button, Result, Empty } from "antd"
import { Link } from "gatsby"
import { EnvironmentOutlined, SettingOutlined, MenuOutlined } from "@ant-design/icons"

import Layout from "../components/layout"
import Clock from "../components/clock"
import Hour from "../components/hour"
import Settings from "../components/settings"

import { getDefaultConfig } from "../utils/config"
import { getOffset, getUTCOffset } from "../utils/datetime"

const { Title, Text } = Typography
const useCitiesState = createPersistedState("cities")
const useConfigState = createPersistedState("config")

export default () => {
  const [width, height] = useWindowSize()
  const [cities] = useCitiesState([])
  const [config, setConfig] = useConfigState(getDefaultConfig())
  const [visible, setVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(moment())

  if (cities.length === 0) {
    return (
      <Layout>
        <Result
          icon={
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No cities"
            />
          }
          extra={
            <Link to="edit">
              <Button type="primary">Create Now</Button>
            </Link>
          }
        />
      </Layout>
    )
  }

  const ref = React.createRef()

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    })
  }, [ width, height ]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment())
    }, 1000)
    return () => clearInterval(intervalId)
  })

  let orderedCities = cities
  if (config.orderTz) {
    orderedCities = sortBy(cities, city => moment(currentTime).tz(city.tz).utcOffset())
  }

  const cityList = orderedCities.map((city, index) => {
    const current = moment(currentTime).tz(city.tz)
    const currentHour = current.hour()
    const hours = []
    for (var i = currentHour - 11; i <= currentHour + 12; i++) {
      if (!config.onlyClocks) {
        const hour = moment.tz(city.tz).hour(i)
        hours.push(
          <Hour
            key={i}
            time={hour}
            format24Hours={config.format24Hours}
            workingHours={config.workingHours}
            disableWorkingHours={config.disableWorkingHours}
          />
        )
      }
      if (i === currentHour) {
        hours.push(
          <Clock
            key={city.id}
            time={current}
            seconds={config.seconds}
            format24Hours={config.format24Hours}
            workingHours={config.workingHours}
            disableWorkingHours={config.disableWorkingHours}
          />
        )
      }
    }
    const currentRef = index === 0 ? ref : null;
    const home = cities.filter(c => c.home)
    let offset = getUTCOffset(current)
    if (home.length) {
      offset = getOffset(city.tz, home[0].tz)
    }

    const cityTitle = (
      <Title level={3} style={{ margin: "0 10px 0.5em 10px" }}>
        {city.home &&
        <EnvironmentOutlined style={{ fontSize: 16, marginRight: 6, verticalAlign: 0 }}/>
        }
        {city.name}
        {config.showOffset && !city.home &&
          <Tag style={{ marginLeft: 8, verticalAlign: "text-bottom" }}>{offset}</Tag>
        }
      </Title>
    )

    return (
      <div
        key={city.id}
        style={{
          whiteSpace: "nowrap",
          textAlign: "center",
          display: "inline-block",
          marginTop: 10,
        }}
      >
        {cityTitle}
        <div ref={currentRef} style={{ display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          {hours}
        </div>
      </div>
    )
  })

  const header = (
    <Row>
      <Col span={12}>
        <Link to="/edit" style={{ color: "inherit" }}>
          <MenuOutlined />
        </Link>
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        <SettingOutlined onClick={() => setVisible(!visible)} />
      </Col>
    </Row>
  )

  return (
    <Layout header={header}>
      {cityList}
      <Drawer
        title="Settings"
        placement="right"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
        width={350}
      >
        <Settings config={config} setConfig={setConfig} />
      </Drawer>
    </Layout>
  )
}
