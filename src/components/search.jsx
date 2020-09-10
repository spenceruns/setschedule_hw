import React, { useState, useEffect } from 'react';
import './search.css'
import AutocompleteInput from './search-bar';

function Search() {
  const [query, setQuery] = useState('')
  const [address, setAddress] = useState('')
  const [radius, setRadius] = useState('')
  const [location, setLocation] = useState({})

  const SearchForLocatons = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
      .then(data => data.json())
      .then(result => {
        setLocation(result.results[0].geometry.location)
        setAddress('')
      })
      .catch(err => console.error(err))
  }

  useEffect(() => fetchGoogleResults(), [location])

  const fetchGoogleResults = () => {
    fetch(`/api/googlesearch?lat=${location.lat}&lng=${location.lng}`)
      .then(data => data.json())
      .then(result => console.log(result))
      .catch(err => console.error(err))
    // fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    //   .then(data => data.json())
    //   .then(result => console.log(result))
    //   .catch(err => console.error(err))
  }

  return (
    <div className="search">
      <input
        type="text"
        onChange={event => setQuery(event.target.value)}
        placeholder="Search"
        value={query}
      />
      <AutocompleteInput address={address} setAddress={setAddress} />
      <input
        type="number"
        onChange={event => setRadius(event.target.value)}
        placeholder="Radius (1-50 miles)"
        value={radius}
      />
      <button onClick={SearchForLocatons}>Click Me!</button>
    </div>
  );
}

export default Search;
