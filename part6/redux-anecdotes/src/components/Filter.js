import React from 'react'
import {filter} from '../reducers/filterReducer'

const Filter = ({store}) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    store.dispatch(filter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter