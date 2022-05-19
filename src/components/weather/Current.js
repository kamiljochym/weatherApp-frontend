import React from "react";
import '../../App.scss'
import sunsetImg from '../../sunset.svg'
import sunriseImg from '../../sunrise.svg'
import windImg from '../../wind.svg'

const Current = ({ currentData, locationName }) => {

    const padNumber = (numberToPad) => {
        return numberToPad.toString().padStart(2, '0')
    }

    const temp = Math.round(currentData.temp)
    const feelsLike = Math.round(currentData.feels_like)
    const conditionDescription = currentData.weather[0].description.charAt(0).toUpperCase() + currentData.weather[0].description.slice(1) //Capitalises the first letter

    const windSpeed = currentData.wind_speed
    const windDirectionDeg = currentData.wind_deg

    const sunriseDate = new Date(currentData.sunrise * 1000)
    const sunrise = `${sunriseDate.getHours()}:${padNumber(sunriseDate.getMinutes())}`

    const sunsetDate = new Date(currentData.sunset * 1000)
    const sunset = (`${sunsetDate.getHours()}:${padNumber(sunsetDate.getMinutes())}`)
    console.log(sunset);
    
    
    

    const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']
    const compassDirection = windDirections[Math.round(windDirectionDeg/45)]

    return (
        <div className="current-wrapper">
            
            <div className="current-location">{locationName}</div>

            <div className="current-row1">
                <div className="current-tempbox">
                    <div className="current-temp">{temp}{`\u00B0`}C</div>
                    <div className="current-feels-like">Feels like: {feelsLike}{`\u00B0`}C</div>
                </div>
                <div className="current-condition">
                    <div className="current-icon">
                        <img src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}></img>
                    </div>
                    <div className="current-condition-desc">{conditionDescription}</div>
                </div>
                <div className="current-extrainfo">
                    <div className="current-wind">
                        <img src={windImg} height={'20px'}></img>
                        <div className="current-wind-speed">{windSpeed}m/s</div>
                        <div className="current-wind-dir">{compassDirection}</div>
                    </div>
                    <div className="current-sun">
                        <img src={sunriseImg} height={'20px'}></img>
                        <div className="current-sunrise">{sunrise}</div>
                        <img src={sunsetImg} height={'20px'}></img>
                        <div className="current-sunset">{sunset}</div>
                    </div>
                </div>
                
            </div>

                
                
        </div>
    )
}

export default Current;