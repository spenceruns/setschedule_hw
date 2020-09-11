import React, { useState } from 'react';
import './App.css'
import Search from './components/search';
import Results from './components/results'

function App() {
  const [storeList, setStoreList] = useState([])

  return (
    <div className="app">
      <Search {...{ setStoreList }} />
      {storeList.length !== 0 &&
        <Results {...{ storeList}}/>}
    </div>
  );
}

export default App;
