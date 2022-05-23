import React, {useState, useEffect} from 'react'

const Hourly = ({hourlyData, timezone_offset}) => {
  //Pads number with a 0 if its shorter than 2 characters, returns a string.
  const padNumber = (numberToPad) => {
    return numberToPad.toString().padStart(2, '0')
  }

  //Using the info from the next 24hrs
  const hourArray = []

  for (let i = 0; i < 24; i++) {
    const unixDate = new Date((hourlyData[i].dt + timezone_offset) * 1000)
    const time = padNumber(`${unixDate.getUTCHours()}`)

    const icon = hourlyData[i].weather[0].icon

    const rainProb = Math.round(hourlyData[i].pop * 100)
    const temp = Math.round(hourlyData[i].temp)

    const hourWeather = {
      time: time,
      icon: icon,
      temp: temp,
      rainProb: rainProb,
    }

    hourArray.push(hourWeather)
  }

  //Allows the horizontal element to be scrollable by the scroll wheel
  const item = document.getElementById('hourly-wrapper')
  if (item) {
    item.addEventListener('wheel', function (e) {
      const item = document.getElementById('hourly-wrapper')

      if (e.deltaY > 0) item.scrollLeft += 40
      else item.scrollLeft -= 40
    })
  }

  return (
    <div className='hourly-wrapper' id='hourly-wrapper'>
      {hourArray.map((hour, Idx) => (
        <div className='hourly-hour'>
          <div>{hour.time}</div>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${hour.icon}@2x.png`}
              height={'70px'}
            ></img>
          </div>
          <div>
            {hour.temp}
            {`\u00B0`}C
          </div>
          {hour.rainProb === 0 ? (
            <></>
          ) : (
            <>
              <div className='hourly-rainProb'>
                <i class='fas fa-tint'></i> {hour.rainProb}%
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Hourly
