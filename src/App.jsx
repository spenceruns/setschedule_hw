import React, { useState } from 'react';
import './App.css'
import Search from './components/search';
import Output from './components/output';

function App() {
  const [gStores, setGStores] = useState([])
  const [yStores, setYStores] = useState([])
  return (
    <div className="app">
      <Search {...{ setGStores, setYStores }} />
      <div className="container">
        <Output {...{ gStores, yStores }} />
      </div>
    </div>
  );
}

export default App;
