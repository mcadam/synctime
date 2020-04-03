import React from "react"
import { getColorForHour } from "../utils/datetime"

export default ({ time, format24Hours, seconds, workingHours,
  disableWorkingHours }) => {
  const hours = format24Hours ? time.format("HH") : time.format("hh")
  const minutes = time.format("mm")
  const secs = time.format("ss")
  const ampm = time.format("A")
  const color = disableWorkingHours ? "rgba(0,0,0,.85)" : getColorForHour(time,
      workingHours)
  const digit = (digit, digitAM) => (
    <span
      style={{
        fontFamily: "SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
        position: "relative",
        margin: 4,
        padding: "6px 4px",
        borderRadius: 3,
        color: "white",
        fontSize: "3.5em",
        backgroundColor: color,
      }}
    >
      {digitAM && !format24Hours && (
        <span
          className="text-monospace"
          style={{
            position: "absolute",
            fontSize: "0.2em",
            bottom: 0,
            left: 3,
          }}
        >
          {digitAM}
        </span>
      )}
      {digit}
    </span>
  )
  return (
    <span style={{ margin: "0 10px" }}>
      {digit(hours, ampm)}
      {digit(minutes)}
      {seconds && digit(secs)}
    </span>
  )
}