import React, { useState } from "react"
import "moment-timezone"
import Moment from "react-moment"
import moment from "moment"
import { Badge, Typography, Row, Col, Button, Result, Empty, Timeline } from "antd"
import { Link } from "gatsby"
import createPersistedState from "use-persisted-state"
import { ClockCircleOutlined, SettingOutlined, MenuOutlined } from "@ant-design/icons"
import Layout from "../components/layout"
import { getColorForHour } from "../utils/datetime"
const useCitiesState = createPersistedState("cities")
const { Title } = Typography;


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
    for (var i = currentHour-11; i <= currentHour; i++) {
      const hour = moment.tz(city.tz).hour(i)
      hoursBefore.push(
        <Badge key={i} count={hour.format("HH")} style={{ marginRight: 5, backgroundColor: getColorForHour(hour) }} />
      )
    }
    const hoursAfter = []
    for (i = currentHour+1; i <= currentHour+12; i++) {
      const hour = moment.tz(city.tz).hour(i)
      hoursAfter.push(
        <Badge key={i} count={hour.format("HH")} style={{ marginRight: 5, backgroundColor: getColorForHour(hour) }} />
      )
    }

    return ([
      <Timeline.Item
        key={city.id}
        label={
          <Title level={3} style={{ marginRight: 10 }}>
            <Moment tz={city.tz} format="HH:mm"/>
          </Title>
        }
        dot={
          <ClockCircleOutlined style={{ fontSize: '16px', color: getColorForHour(current) }} />
        }
      >
        <Title level={3}>
          {city.name}
        </Title>
      </Timeline.Item>,
      <Timeline.Item
        color={getColorForHour(current)}
        label={hoursBefore}
      >
        {hoursAfter}
      </Timeline.Item>
    ])
  })

  const header = (
    <Row>
      <Col span={12}>
        <Link to="edit" style={{ color: 'inherit' }}>
          <MenuOutlined />
        </Link>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        <SettingOutlined onClick={() => setCollapsed(!collapsed)}/>
      </Col>
    </Row>
  )

  return (
    <Layout header={header}>
      <Timeline mode="left" style={{ whiteSpace: 'nowrap' }}>
        {cityList}
      </Timeline>
    </Layout>
  )
}
