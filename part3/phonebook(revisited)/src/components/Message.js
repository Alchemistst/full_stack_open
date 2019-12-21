import React from 'react'


//Message component render both notification (if called with err = "message") and error messages (if called with err = "error")
const Message = ({message}) =>{
    
    let style = {}

    if (message.mes === null) {
        return null
    }

    
    if(message.err === "error"){
        style = {
            color: "red",
            background: "lightgrey",
            fontSize: "20px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px"
            }
    }else if(message.err === "message"){
        style = {
            color: "green",
            background: "lightgrey",
            fontSize: "20px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px"
        }
    }
    

    return (
        <div style={style}>
            {message.mes}
        </div>
    )
}

export default Message