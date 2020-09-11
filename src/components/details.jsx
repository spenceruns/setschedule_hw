import React from 'react'
import Map from './map'

function Details(props) {
  const store = props.details.result ? props.details.result : props.details
  let address = ''
  if (store.location) {
    for (let i = 0; i < store.location.display_address.length; i++) {
      address += `${store.location.display_address[i]}\n`
    }
  } else {
    address = store.formatted_address
  }
  return (
    <div className="details-container">
      <h1>{ store.name }</h1>
      <div className="map">
        <Map location={store.geometry} />
      </div>
      <div>{ address }</div>
      <div>{ store.display_phone ? store.display_phone : store.formatted_phone_number }</div>
      <a href={store.url ? store.url : store.website} target="_blank" rel="noopener noreferrer">More Info</a>
    </div>
  )
}

export default Details
