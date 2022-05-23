import React from 'react'
import Current from './weather/Current'
import Hourly from './weather/Hourly'
import Daily from './weather/Daily'

const Forecast = ({forecastData, locationName}) => {
  return (
    <>
      {forecastData ? (
        <>
          <Current
            currentData={forecastData.current}
            locationName={locationName}
            timezone_offset={forecastData.timezone_offset}
          />
          <Hourly
            hourlyData={forecastData.hourly}
            timezone_offset={forecastData.timezone_offset}
          />
          <Daily dailyData={forecastData.daily} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Forecast
