import React, { useState } from 'react';
import './App.css'
import AutocompleteInput from './components/search-bar';

function App() {
  let [address, setAddress] = useState('')

  return (
    <div className="app">
      <input type="text" placeholder="Search"/>
      <AutocompleteInput />
      <input type="number" min="1" max="50"/>
      <button>Click Me!</button>
    </div>
  );
}

export default App;
