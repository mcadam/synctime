import React from "react"
import { Slider, Switch, List, Typography } from "antd"
import { cloneDeep } from 'lodash'

const { Item } = List
const { Text } = Typography


export default ({ config, setConfig }) => {
  const handle24Hours = (checked) => {
    config.format24Hours = checked
    setConfig(cloneDeep(config))
  }

  const handleSeconds = (checked) => {
    config.seconds = checked
    setConfig(cloneDeep(config))
  }

  const handleWorkingHours = (range) => {
    config.workingHours.start = range[0]
    config.workingHours.end = range[1]
    setConfig(cloneDeep(config))
  }

  const handleExtraWorkingHours = (range) => {
    config.workingHours.before = range[0]
    config.workingHours.after = range[1]
    setConfig(cloneDeep(config))
  }

  const handleOnlyClocks = (checked) => {
    config.onlyClocks = checked
    setConfig(cloneDeep(config))
  }

  const handleDisableWorkingHours = (checked) => {
    config.disableWorkingHours = checked
    setConfig(cloneDeep(config))
  }

  const items = [
    {
      title: "Use 24 Hours",
      actions: [
        <Switch defaultChecked={config.format24Hours} onChange={handle24Hours}/>
      ]
    },
    {
      title: "Display Seconds",
      actions: [
        <Switch defaultChecked={config.seconds} onChange={handleSeconds}/>
      ]
    },
    {
      title: "Only Display Clocks",
      actions: [
        <Switch defaultChecked={config.onlyClocks} onChange={handleOnlyClocks}/>
      ]
    },
    {
      title: "Disable Working Hours",
      actions: [
        <Switch defaultChecked={config.disableWorkingHours}
        onChange={handleDisableWorkingHours}/>
      ]
    },
    {
      title: "Work Hours",
      actions: [
        <Slider style={{ width: 200 }} min={0} max={24} range defaultValue={[config.workingHours.start,
          config.workingHours.end]} onChange={handleWorkingHours}/>
      ]
    },
    {
      title: "Extra Work Hours",
      actions: [
        <Slider style={{ width: 200 }} min={0} max={24} range defaultValue={[config.workingHours.before,
          config.workingHours.after]} onChange={handleExtraWorkingHours}/>
      ]
    },
  ]

  return (
    <List
      dataSource={items}
      renderItem={item => (
        <Item actions={item.actions}>
          <Text strong>{item.title}</Text>
        </Item>
      )}
    />
  )
}