import React, { useState } from "react"
import { Row, Col, Input, AutoComplete } from "antd"
import createPersistedState from "use-persisted-state"
import { searchCities, boldSubString } from "../utils/search"
import Layout from "../components/layout"
import { ArrowLeftOutlined } from "@ant-design/icons"
const { Search } = Input
const useCitiesState = createPersistedState("cities")


export default () => {
  const [value, setValue] = useState('');
  const [cities, setCities] = useCitiesState([])
  const [options, setOptions] = useState([])

  const handleSearch = query => {
    const result = query ? searchCities(query) : []
    setOptions(result.map(city => {
      const label = boldSubString(`${city.name}, ${city.country}`, query)
      return {
        label: (
          <span
            dangerouslySetInnerHTML={{ __html: label }}
          />
        ),
        value: JSON.stringify(city),
      }
    }))
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

  const cityList = cities.map(city => (
    <h2 key={city.id}>
      {city.name}
    </h2>
  ))

  const header = (
    <ArrowLeftOutlined onClick={() => window.history.back()} />
  )

  return (
    <Layout header={header}>
      <Row>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 7 }}>
          <AutoComplete
            style={{ width: '100%' }}
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
      {cityList}
    </Layout>
  )
}
