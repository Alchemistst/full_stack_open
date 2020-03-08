import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    background: 'lightgrey',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    marginBottom: '15px'
  }

  const message = props.message

  return (
    <div>
      {message !== '' && <div style={style}>
        {message}
      </div>}
    </div>
  )
}

const mapStateToProps = ({message}) => {
  return {message}
}

export default connect (mapStateToProps) (Notification)