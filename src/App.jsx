import React, { useState } from 'react';
import './App.css'
import Search from './components/search';
import { useEffectAfterRender } from './components/useEffectAfterRender';

function App() {
  const [storeList, setStoreList] = useState([])
  console.log(storeList)
  return (
    <div className="app">
      <Search {...{ setStoreList }} />
      <div className="container">
      </div>
    </div>
  );
}

export default App;
