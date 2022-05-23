import './App.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Forecast from './components/Forecast'

function App() {
  const [autocomplete, setAutocomplete] = useState([])
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [forecastData, setForecastData] = useState()
  const [locationName, setLocationName] = useState()

  useEffect(() => {
    sendCoordinates('London')
  }, [])

  const handleNewSearch = (event) => {
    const searchName = event.target.value.toLowerCase()

    if (searchName === '') {
      setShowAutocomplete(false)
      return
    } else {
      //Gets top 5 search results from back end
      axios
        .get(`http://localhost:3001/autocomplete/${searchName}`)
        .then((response) => {
          const data = response.data.predictions

          const predictions = []
          for (let term of data) {
            predictions.push(term.description)
          }
          setShowAutocomplete(true)
          setAutocomplete(predictions)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const sendCoordinates = (term) => {
    const toSend = {
      name: term,
    }
    axios
      .post('http://localhost:3001/coords', toSend)
      .then((response) => {
        setForecastData(response.data)
        setLocationName(term)
      })
      .catch((error) => console.log(error))
  }

  const handleFocusOn = () => {
    setShowAutocomplete(true)
  }

  const handleFocusOff = () => {
    setTimeout(() => {
      setShowAutocomplete(false)
    }, 100)
  }

  return (
    <>
      <div id='background-container'></div>
      <div className='container'>
        <h1>Weather App</h1>
        <div className='searchBox'>
          <Filter
            handleNewSearch={handleNewSearch}
            autocomplete={autocomplete}
            showAutocomplete={showAutocomplete}
            sendCoordinates={sendCoordinates}
            handleFocusOff={handleFocusOff}
            handleFocusOn={handleFocusOn}
          />
        </div>
        <Forecast forecastData={forecastData} locationName={locationName} />
      </div>
    </>
  )
}

export default App
