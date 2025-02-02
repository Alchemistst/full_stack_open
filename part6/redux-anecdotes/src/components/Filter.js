import React from 'react'
import { connect } from 'react-redux'

//Reducers
import {filter} from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.filter(event.target.value)
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

export default connect (null, {filter}) (Filter)