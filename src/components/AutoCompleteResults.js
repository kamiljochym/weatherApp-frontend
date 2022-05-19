import React, { useState } from "react";
import '../App.scss';
import axios from "axios";
import poweredByGoogle from './powered_by_google_on_white_hdpi.png'


const AutoCompleteResults = ({autocomplete, sendCoordinates}) => {

    return (
        <>
          {autocomplete.map((term, idx) => (
            <div className="autocompleteTerm" onClick={() => sendCoordinates(term)}>{term}</div>
          ))}
          {autocomplete.length > 0 
          ? 
          <div className="poweredByGoogle">
              <img src={poweredByGoogle}></img>
          </div>
          : <></>}
        </>
    )
}

export default AutoCompleteResults;

