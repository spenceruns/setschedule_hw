import React, { useState } from 'react';
import './search.css'
import AutocompleteInput from './search-bar';
import { useEffectAfterRender } from './useEffectAfterRender'

function Search(props) {
  const [query, setQuery] = useState('')
  const [address, setAddress] = useState('')
  const [distance, setDistance] = useState('')
  const [location, setLocation] = useState({})

  const SearchForLocatons = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
      .then(data => data.json())
      .then(result => {
        setLocation(result.results[0].geometry.location)
        setQuery('')
        setAddress('')
        setDistance('')
      })
      .catch(err => console.error(err))
  }

  const performSearch = () => {
    fetchGoogleResults()
    fetchYelpResults()
  }

  useEffectAfterRender(performSearch, location)

  const fetchGoogleResults = () => {
    const radius = Math.floor(distance / 0.00062137)
    fetch(`/api/googlesearch?query=${query}&lat=${location.lat}&lng=${location.lng}&radius=${radius}`)
      .then(data => data.json())
      .then(result => props.setGStores(result.results))
      .catch(err => console.error(err))
  }

  const fetchYelpResults = () => {
    const radius = Math.floor(distance / 0.00062137)
    const yelpRadius = radius > 40000 ? 40000 : radius
    fetch(`/api/yelpsearch?query=${query}&lat=${location.lat}&lng=${location.lng}&radius=${yelpRadius}`)
      .then(data => data.json())
      .then(result => props.setYStores(result.businesses))
      .catch(err => console.error(err))
  }

  return (
    <div className="search">
      <input
        type="text"
        onChange={event => setQuery(event.target.value)}
        placeholder="Search"
        value={query}
      />
      <AutocompleteInput {...{address, setAddress}}/>
      <input
        type="number"
        onChange={event => setDistance(event.target.value)}
        placeholder="Radius (1-50 miles)"
        value={distance}
      />
      <button onClick={SearchForLocatons}>Click Me!</button>
    </div>
  );
}

export default Search;
