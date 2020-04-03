import React from "react"
import { Tag } from "antd"
import { getColorForHour } from "../utils/datetime"

export default ({ time, format24Hours, workingHours, disableWorkingHours }) => {
  const hour = format24Hours ? time.format("HH") : time.format(" h")
  const ampm = time.format("A")
  const color = disableWorkingHours ? "#ccc" : getColorForHour(time,
    workingHours)
  return (
    <Tag
      className="text-monospace"
      color={color}
      style={{
        borderRadius: "20px",
        height: 20,
        padding: "0 5px",
        width: "35px",
        border: 0,
        marginRight: 5,
      }}
    >
      {hour}
      {!format24Hours && <span style={{ fontSize: "0.75em" }}>{ampm}</span>}
    </Tag>
  )
}
