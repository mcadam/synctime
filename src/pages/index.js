import React, { useState } from "react"
import "moment-timezone"
import moment from "moment"
import { Badge, Typography, Row, Col, Button, Result, Empty } from "antd"
import { Link } from "gatsby"
import createPersistedState from "use-persisted-state"
import { SettingOutlined, MenuOutlined } from "@ant-design/icons"
import Layout from "../components/layout"
import { getColorForHour } from "../utils/datetime"
const useCitiesState = createPersistedState("cities")
const { Title } = Typography

export default () => {
  const [cities] = useCitiesState([])
  const [collapsed, setCollapsed] = useState(true)

  if (!cities.length) {
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

  const cityList = cities.map(city => {
    const current = moment.tz(city.tz)
    const currentHour = current.hour()
    const hoursBefore = []
    for (var i = currentHour - 11; i <= currentHour; i++) {
      const hour = moment.tz(city.tz).hour(i)
      let count = hour.format("HH")
      hoursBefore.push(
        <Badge
          key={i}
          count={count}
          style={{
            marginBottom: 18,
            marginRight: 5,
            backgroundColor: getColorForHour(hour),
          }}
        />
      )
    }
    const hoursAfter = []
    for (i = currentHour + 1; i <= currentHour + 12; i++) {
      const hour = moment.tz(city.tz).hour(i)
      let count = hour.format("HH")
      hoursAfter.push(
        <Badge
          key={i}
          count={count}
          style={{
            marginBottom: 18,
            marginRight: 5,
            backgroundColor: getColorForHour(hour),
          }}
        />
      )
    }

    return (
      <div
        key={city.id}
        style={{
          whiteSpace: "nowrap",
          textAlign: "center",
          display: "inline-block",
        }}
      >
        <Title
          level={4}
          style={{ position: "fixed", margin: "auto", left: 0, right: 0 }}
        >
          {city.name}
        </Title>
        <div style={{ marginTop: 25 }}>
          {hoursBefore}
          <Title
            level={1}
            style={{
              margin: "5px 15px",
              color: getColorForHour(current),
              display: "inline-block",
            }}
          >
            {current.format("HH:mm")}
          </Title>
          {hoursAfter}
        </div>
      </div>
    )
  })

  const header = (
    <Row>
      <Col span={12}>
        <Link to="edit" style={{ color: "inherit" }}>
          <MenuOutlined />
        </Link>
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        <SettingOutlined onClick={() => setCollapsed(!collapsed)} />
      </Col>
    </Row>
  )

  return <Layout header={header}>{cityList}</Layout>
}
