import React from "react";
import cloud_rain from '../../cloud-rain.svg'




const Daily = ({dailyData}) => {

    const dailyArray = []

    for (let i=0; i< 7; i++) {
        const week = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const unixDate = new Date(dailyData[i].dt * 1000)
        let dayName = ""

        if (i === 0) {
            dayName = "Today"
        }
        else {
            dayName = week[ unixDate.getDay() ] 
        }

        const icon = dailyData[i].weather[0].icon

        const rainProb = Math.round(dailyData[i].pop*100)

        const minTemp = Math.round(dailyData[i].temp.min)
        const maxTemp = Math.round(dailyData[i].temp.max)

        const dayObject = {
            dayName: dayName,
            icon: icon,
            rainProb: rainProb,
            minTemp: minTemp,
            maxTemp: maxTemp
        }
        dailyArray.push(dayObject)
        console.log(dayObject);
    }

    

    return (
        <div className="daily-wrapper">
            {dailyArray.map((day, Idx) => (
                <div className="daily-day">
                    <div>{day.dayName}</div>
                    {day.rainProb === 0 ?
                        <div><img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}></img></div>
                    :   <div className="icon-with-rain">
                            <img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}></img>
                            <div className="rain-prob">
                                <i class="fas fa-tint"></i>
                                {day.rainProb}%
                            </div>
                        </div>
                    }
                    <div>{day.minTemp}{`\u00B0`} - {day.maxTemp}{`\u00B0`}</div>
                </div>
            ))}
        </div>
    )
}

export default Daily;