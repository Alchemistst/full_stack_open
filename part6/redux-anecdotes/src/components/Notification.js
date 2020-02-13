import React from 'react'

//Reducers
import {endMessage} from '../reducers/messageReducer'

const Notification = ({store}) => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    background: 'lightgrey'
  }

  const message = store.getState().message

  const displayAndDisappear = () =>{
    if (message !== ''){
      const timeoutID = setTimeout(() => {
        store.dispatch(endMessage())}, 5000)
      clearTimeout(timeoutID-1)
    }
  }

  return (
    <div>
      {message !== '' && <div style={style}>
        {message}
        {displayAndDisappear()}
      </div>}
    </div>
  )
}

export default Notification