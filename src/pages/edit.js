import React, { useState } from "react"
import { Typography, Button, List, Row, Col, Input, AutoComplete } from "antd"
import createPersistedState from "use-persisted-state"
import { searchCities, boldSubString } from "../utils/search"
import Layout from "../components/layout"
import { Link } from "gatsby"
import {
  EnvironmentOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons"
const { Search } = Input
const { Item } = List
const { Text } = Typography

const useCitiesState = createPersistedState("cities")

export default () => {
  const [value, setValue] = useState("")
  const [cities, setCities] = useCitiesState([])
  const [options, setOptions] = useState([])

  const handleSearch = query => {
    const result = query ? searchCities(query) : []
    setOptions(
      result.map(city => {
        const label = boldSubString(`${city.name}, ${city.country}`, query)
        return {
          label: <span dangerouslySetInnerHTML={{ __html: label }} />,
          value: JSON.stringify(city),
        }
      })
    )
  }

  const handleSelect = data => {
    setValue("")
    setOptions([])
    const city = JSON.parse(data)
    for (var c of cities) {
      if (c.id === city.id) {
        return
      }
    }
    setCities([...cities, city])
  }

  const handleChange = data => {
    setValue(data)
  }

  const makeHome = city => {
    for (var c of cities) {
      c.home = false
    }
    city.home = true
    setCities([...cities])
  }

  const deleteCity = city => {
    setCities([...cities.filter(c => c.id !== city.id)])
  }

  const header = (
    <Link to="/">
      <ArrowLeftOutlined style={{ marginRight: 10 }} />
      Back Home
    </Link>
  )

  return (
    <Layout header={header}>
      <Row>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 7 }}>
          <AutoComplete
            style={{ width: "100%", marginTop: 10, marginBottom: 30 }}
            onSearch={handleSearch}
            onSelect={handleSelect}
            onChange={handleChange}
            value={value}
            options={options}
          >
            <Search size="large" placeholder="Search cities / countries" />
          </AutoComplete>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <List
            dataSource={cities}
            renderItem={city => (
              <Item
                actions={[
                  <Button
                    icon={<EnvironmentOutlined />}
                    onClick={() => makeHome(city)}
                  >
                    Display as Home City
                  </Button>,
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteCity(city)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <Text strong>
                  {city.name} - {city.country}
                </Text>
              </Item>
            )}
            footer={
              <Link to="/">
                <Button style={{ marginRight: 8 }}>Cancel</Button>
                <Button type="primary">OK</Button>
              </Link>
            }
          />
        </Col>
      </Row>
    </Layout>
  )
}
