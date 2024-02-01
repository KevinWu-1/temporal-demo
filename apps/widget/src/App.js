import React from "react"
import WeatherNow from "./components/WeatherNow"

function App(props) {
  return (
    <div>
      <WeatherNow symbol={props.symbol} />
    </div>
  )
}

export default App
