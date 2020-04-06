import React, { useState, useEffect } from "react"
import "moment-timezone"
import moment from "moment"
import createPersistedState from "use-persisted-state"
import { useWindowSize } from "@react-hook/window-size"
import { sortBy } from "lodash"
import themeSwitcher from "theme-switcher"

import { Tag, Drawer, Typography, Row, Col, Button, Result } from "antd"
import { Link } from "gatsby"
import {
  EnvironmentOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons"

import Layout from "../components/layout"
import Clock from "../components/clock"
import Hour from "../components/hour"
import Settings from "../components/settings"

import { getDefaultConfig } from "../utils/config"
import { getOffset, getUTCOffset } from "../utils/datetime"

const { Title } = Typography
const useCitiesState = createPersistedState("cities")
const useConfigState = createPersistedState("config")

const { switcher, getTheme } = themeSwitcher({
  themeMap: {
    default: "/antd.min.css",
    dark: "/antd.dark.min.css",
  },
})

export default () => {
  const [width, height] = useWindowSize()
  const [cities] = useCitiesState([])
  const [config, setConfig] = useConfigState(getDefaultConfig())
  const [visible, setVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(moment())


  if (cities.length === 0) {

    useEffect(() => {
      const dom = document.getElementById("theme-style")
      const theme = config.darkMode ? "dark" : "default"
      if (theme !== getTheme() || !dom) {
        switcher({ theme: theme })
      }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <Result
        status="404"
        title="No Cities!"
        subTitle="Create new cities to get clocks and time lines."
        extra={
          <Link to="/edit">
            <Button type="primary">Create Now</Button>
          </Link>
        }
      />
    )
  }

  const ref = React.createRef()

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    })
  }, [width, height]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment())
    }, 1000)
    return () => clearInterval(intervalId)
  })

  let orderedCities = cities
  if (config.orderTz) {
    orderedCities = sortBy(cities, city =>
      moment(currentTime)
        .tz(city.tz)
        .utcOffset()
    )
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
            key={`hour-${i}-${city.id}`}
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
            key={`clock-${i}-${city.id}`}
            time={current}
            seconds={config.seconds}
            format24Hours={config.format24Hours}
            workingHours={config.workingHours}
            disableWorkingHours={config.disableWorkingHours}
            large={config.large}
          />
        )
      }
    }
    const currentRef = index === 0 ? ref : null
    const home = cities.filter(c => c.home)
    let offset = getUTCOffset(current)
    if (home.length) {
      offset = getOffset(city.tz, home[0].tz)
    }
    const titleLevel = config.large ? 1 : 3

    const cityTitle = (
      <Title level={titleLevel} style={{ margin: "0 10px 0.5em 10px" }}>
        {city.home && (
          <EnvironmentOutlined
            style={{ fontSize: 16, marginRight: 6, verticalAlign: 0 }}
          />
        )}
        {city.name}
        {config.showOffset && !city.home && (
          <Tag style={{ marginLeft: 8, verticalAlign: "text-bottom" }}>
            {offset}
          </Tag>
        )}
      </Title>
    )

    return (
      <div
        key={`city-${city.id}`}
        style={{
          whiteSpace: "nowrap",
          textAlign: "center",
          display: "inline-block",
          marginBottom: 10,
        }}
      >
        {cityTitle}
        <div
          ref={currentRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
