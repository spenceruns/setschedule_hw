import React, { useState } from 'react';
import './search.css'
import AutocompleteInput from './search-bar';

function Search() {
  let [query, setQuery] = useState('')
  let [radius, setRadius] = useState('')

  console.log({radius, query})

  return (
    <div className="search">
      <input
        type="text"
        onChange={event => setQuery(event.target.value)}
        placeholder="Search"
        value={query}
      />
      <AutocompleteInput />
      <input
        type="number"
        onChange={event => setRadius(event.target.value)}
        placeholder="Radius (1-50 miles)"
        value={radius}
      />
      <button>Click Me!</button>
    </div>
  );
}

export default Search;
