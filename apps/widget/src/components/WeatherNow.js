import React, { useState, useEffect } from "react"
import axiosInstance from "../index"
import axios from "axios"
import "./WeatherNow.css"

const WEATHER_NOW_URL = `${process.env.REACT_APP_WEATHER_BASE_URL}current.json?key=${process.env.REACT_APP_WEATHER_ACCESS_KEY}`
const SERVICE_URL = process.env.SERVICE_URL || "http://localhost:3000"

function WeatherNow(props) {
  const [currentWeather, setCurrentWeather] = useState({
    temp_c: "--",
    feelslike_c: "--",
    time: "--",
    location: "--"
  })

  useEffect(() => {
    axiosInstance
      .get(`${WEATHER_NOW_URL}&q=${props.symbol}&aqi=no`)
      .then(result => {
        if (!result.data || !result.data.current) {
          return
        }
        const location = result.data.location
        const current = result.data.current
        setCurrentWeather({
          temp_c: current.temp_c,
          feelslike_c: current.feelslike_c,
          location: location.name,
          time: location.localtime
        })
      })
  }, [])

  const login = async otp => {
    try {
      const response = await axios.post(`${SERVICE_URL}/login/?otp=1234`)
      const data = response

      console.log("Logged in!!!", data)
    } catch (error) {
      console.error("Error making the request:", error)
      console.log("Failed to log in!!!")
    }
  }

  const tempColor =
    currentWeather.temp_c < 0 ? "temp-negative" : "temp-positive"

  return (
    <div className="Widget" onClick={() => login(1234)}>
      <div className="Widget-header">{currentWeather.location} (°C)</div>
      <div className="Widget-body">
        Actual:{" "}
        <div className={`Widget-block-actual ${tempColor}`}>
          {currentWeather.temp_c}
        </div>
        Feels like:{" "}
        <div className="Widget-block">{currentWeather.feelslike_c}</div>
      </div>
      <div className="Widget-footer">As of: {currentWeather.time}</div>
    </div>
  )
}

export default WeatherNow
