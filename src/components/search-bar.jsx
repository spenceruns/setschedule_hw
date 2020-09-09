import React, { useState, useEffect, useRef } from "react";

function AutocompleteInput(props) {
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`,
      () => handleScriptLoad(props.setAddress, autoCompleteRef)
    );
  }, []);

  return (
    <div className="autocomplete">
      <input
        ref={autoCompleteRef}
        onChange={event => props.setAddress(event.target.value)}
        placeholder="Address"
        value={props.address}
      />
    </div>
  );
}

export default AutocompleteInput;

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script")
  script.type = "text/javascript"
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    script.onload = () => callback();
  }

  script.src = url
  document.getElementsByTagName("head")[0].appendChild(script)
}

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
}
