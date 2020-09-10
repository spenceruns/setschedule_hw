import React from 'react'
import "./output.css"
import SearchResult from './search-result'

function Output(props) {
  return (
    <div className="output">
      {props.gStores &&
        props.gStores.map(store => <SearchResult key={store.place_id ? store.place_id : store.id} name={store.name} />)}
      {props.yStores &&
        props.yStores.map(store => <SearchResult key={store.place_id ? store.place_id : store.id} name={store.name} />)}
    </div>
  )
}

export default Output
