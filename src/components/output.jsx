import React from 'react'
import "./output.css"

function Output(props) {
  const stores = props.gStores ? props.gStores : props.yStores
  return (
    <div className="output">
      {stores &&
        stores.map(store => <div className="store" key={store.id ? store.id : store.place_id}>{store.name}</div>)}
    </div>
  )
}

export default Output
