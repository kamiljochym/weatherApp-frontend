import React from 'react'
import AutoCompleteResults from './AutoCompleteResults'
import '../App.scss'

const Filter = ({
  handleNewSearch,
  autocomplete,
  showAutocomplete,
  handleFocusOff,
  handleFocusOn,
  sendCoordinates,
}) => {
  return (
    <div className='searchBar'>
      <input
        onChange={handleNewSearch}
        onFocus={handleFocusOn}
        onBlur={handleFocusOff}
        placeholder='Search Location'
      />

      {showAutocomplete ? (
        <AutoCompleteResults
          autocomplete={autocomplete}
          sendCoordinates={sendCoordinates}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default Filter
