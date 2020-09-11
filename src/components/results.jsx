import React, { useState } from 'react'
import './results.css'
import { useEffectAfterRender } from './useEffectAfterRender'
import Details from './details'

function Results(props) {
  const [details, setDetails] = useState([])
  const [currentStore, setCurrentStore] = useState([])
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(9)

  function addPage() {
    setLeft(left + 9)
    setRight(right + 9)
  }

  function subtractPage() {
    setLeft(left - 9)
    setRight(right - 9)
  }

  function getStoreDetails() {
    const id = currentStore.place_id ? currentStore.place_id : currentStore.id
    const url = currentStore.place_id ? "googlestore" : "yelpstore"

    fetch(`/api/${url}?id=${id}`)
      .then(data => data.json())
      .then(result => setDetails(result))
      .catch(err => console.error(err))
  }

  useEffectAfterRender(getStoreDetails, currentStore)

  const stores = props.storeList.slice(left,right)
  const leftHide = stores[left] === props.storeList[0] ? "hidden" : ""
  const rightHide = stores[stores.length-1] === props.storeList[props.storeList.length-1] ? "hidden" : ""

  return (
    <div className="container fade-in">
      <div className="store-list">
          {stores.map(store =>
          <div
            key={store.id ? store.id : store.place_id}
            className="store"
            onClick={() => setCurrentStore(store)}
          >
            {store.name}
          </div>)}
        <div className="pages">
          <div onClick={subtractPage} className={`left ${leftHide}`}>{"<"}</div>
          <div onClick={addPage} className={`right ${rightHide}`}>{">"}</div>
        </div>
      </div>
      <div className="store-details">
          {details.length !== 0 &&
            <Details {...{details}} /> }
      </div>
    </div>
  )
}

export default Results
