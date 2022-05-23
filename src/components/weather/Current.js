import React from 'react'
import '../../App.scss'
import sunsetImg from '../../sunset.svg'
import sunriseImg from '../../sunrise.svg'
import windImg from '../../wind.svg'

const Current = ({currentData, locationName, timezone_offset}) => {
  const padNumber = (numberToPad) => {
    return numberToPad.toString().padStart(2, '0')
  }

  const temp = Math.round(currentData.temp)
  const feelsLike = Math.round(currentData.feels_like)
  const conditionDescription =
    currentData.weather[0].description.charAt(0).toUpperCase() +
    currentData.weather[0].description.slice(1) //Capitalises the first letter

  const windSpeed = currentData.wind_speed
  const windDirectionDeg = currentData.wind_deg

  const sunriseDate = new Date((currentData.sunrise + timezone_offset) * 1000)
  const sunrise = `${sunriseDate.getHours()}:${padNumber(sunriseDate.getUTCMinutes())}`

  const sunsetDate = new Date((currentData.sunset + timezone_offset) * 1000)
  const sunset = `${sunsetDate.getHours()}:${padNumber(sunsetDate.getUTCMinutes())}`

  const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']
  const compassDirection = windDirections[Math.round(windDirectionDeg / 45)]
  console.log(currentData)

  const updateBackground = () => {
    const unixDate = new Date((currentData.dt + timezone_offset) * 1000)

    console.log(unixDate.getTime(), sunsetDate.getTime())
    if (
      unixDate.getTime() > sunsetDate.getTime() ||
      unixDate.getTime() < sunriseDate.getTime()
    ) {
      document.getElementById('background-container').style.backgroundImage = `url(${
        require('../../night.jpg').default
      })`
      return
    }
    // codes for sunny weather
    const sunnyCodes = [800, 801, 500, 501, 502, 503, 504]
    if (sunnyCodes.includes(currentData.weather[0].id)) {
      console.log('sunshine')
      document.getElementById('background-container').style.backgroundImage = `url(${
        require('../../weather.jpg').default
      })`

      return
    }
    console.log('cloudy')
    document.getElementById('background-container').style.backgroundImage = `url(${
      require('../../cloudy.jpg').default
    })`
  }
  updateBackground()

  return (
    <div className='current-wrapper'>
      <div className='current-location'>{locationName}</div>

      <div className='current-row1'>
        <div className='current-tempbox'>
          <div className='current-temp'>
            {temp}
            {`\u00B0`}C
          </div>
          <div className='current-feels-like'>
            Feels like: {feelsLike}
            {`\u00B0`}C
          </div>
        </div>
        <div className='current-condition'>
          <div className='current-icon'>
            <img
              src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
            ></img>
          </div>
          <div className='current-condition-desc'>{conditionDescription}</div>
        </div>
      </div>
      <div className='current-extrainfo'>
        <div className='current-wind'>
          <img src={windImg} height={'20px'}></img>
          <div className='current-wind-speed'>{windSpeed}m/s</div>
          <div className='current-wind-dir'>{compassDirection}</div>
        </div>
        <div className='current-sun'>
          <img src={sunriseImg} height={'20px'}></img>
          <div className='current-sunrise'>{sunrise}</div>
          <img src={sunsetImg} height={'20px'}></img>
          <div className='current-sunset'>{sunset}</div>
        </div>
      </div>
    </div>
  )
}

export default Current
