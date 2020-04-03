import React from "react"
import { Tag } from "antd"
import { getColorForHour } from "../utils/datetime"

export default ({ time, format24Hours }) => {
  const hour = format24Hours ? time.format("HH") : time.format(" h")
  const ampm = time.format("A")
  const width = format24Hours ? "auto" : "35px"
  return (
    <Tag
      className="text-monospace"
      color={getColorForHour(time)}
      style={{
        borderRadius: "20px",
        height: 20,
        padding: "0 5px",
        width: width,
        border: 0,
        marginRight: 5,
      }}
    >
      {hour}
      {!format24Hours && <span style={{ fontSize: "0.75em" }}>{ampm}</span>}
    </Tag>
  )
}
