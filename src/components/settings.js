import React from "react"
import { Slider, Switch, List, Typography } from "antd"
import { cloneDeep } from "lodash"

const { Item } = List
const { Text } = Typography

export default ({ config, setConfig }) => {
  const handle24Hours = checked => {
    config.format24Hours = checked
    setConfig(cloneDeep(config))
  }

  const handleSeconds = checked => {
    config.seconds = checked
    setConfig(cloneDeep(config))
  }

  const handleWorkingHours = range => {
    config.workingHours.start = range[0]
    config.workingHours.end = range[1]
    setConfig(cloneDeep(config))
  }

  const handleExtraWorkingHours = range => {
    config.workingHours.before = range[0]
    config.workingHours.after = range[1]
    setConfig(cloneDeep(config))
  }

  const handleOnlyClocks = checked => {
    config.onlyClocks = checked
    setConfig(cloneDeep(config))
  }

  const handleDarkMode = checked => {
    config.darkMode = checked
    setConfig(cloneDeep(config))
  }

  const handleOrderTz = checked => {
    config.orderTz = checked
    setConfig(cloneDeep(config))
  }

  const handleShowOffset = checked => {
    config.showOffset = checked
    setConfig(cloneDeep(config))
  }

  const handleLarge = checked => {
    config.large = checked
    setConfig(cloneDeep(config))
  }

  const handleDisableWorkingHours = checked => {
    config.disableWorkingHours = checked
    setConfig(cloneDeep(config))
  }

  const items = [
    {
      title: "Dark Mode",
      actions: [
        <Switch
          defaultChecked={config.darkMode}
          onChange={handleDarkMode}
        />,
      ],
    },
    {
      title: "Use 24 Hours",
      actions: [
        <Switch
          defaultChecked={config.format24Hours}
          onChange={handle24Hours}
        />,
      ],
    },
    {
      title: "Display Seconds",
      actions: [
        <Switch defaultChecked={config.seconds} onChange={handleSeconds} />,
      ],
    },
    {
      title: "Only Display Clocks",
      actions: [
        <Switch
          defaultChecked={config.onlyClocks}
          onChange={handleOnlyClocks}
        />,
      ],
    },
    {
      title: "Order by Timezone ",
      actions: [
        <Switch defaultChecked={config.orderTz} onChange={handleOrderTz} />,
      ],
    },
    {
      title: "Show Timezone Offset",
      actions: [
        <Switch
          defaultChecked={config.showOffset}
          onChange={handleShowOffset}
        />,
      ],
    },
    {
      title: "Make Clock Bigger",
      actions: [
        <Switch defaultChecked={config.large} onChange={handleLarge} />,
      ],
    },
    {
      title: "Disable Working Hours",
      actions: [
        <Switch
          defaultChecked={config.disableWorkingHours}
          onChange={handleDisableWorkingHours}
        />,
      ],
    },
    {
      title: "Work Hours",
      actions: [
        <Slider
          style={{ width: 200 }}
          min={0}
          max={24}
          range
          defaultValue={[config.workingHours.start, config.workingHours.end]}
          onChange={handleWorkingHours}
        />,
      ],
    },
    {
      title: "Extra Work Hours",
      actions: [
        <Slider
          style={{ width: 200 }}
          min={0}
          max={24}
          range
          defaultValue={[config.workingHours.before, config.workingHours.after]}
          onChange={handleExtraWorkingHours}
        />,
      ],
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
