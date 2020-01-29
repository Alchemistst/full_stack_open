import React, {useState} from 'react'

const Togglable = (props) => {
    
    //STATE
    const [visible, setVisible] = useState(false)

    //STYLE
    const visibility = {
        display: visible ? '' : 'none'
    }
    
    //VARS AND CONSTS
    const buttonLabel = visible ? 'Cancel' : props.buttonLabel

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return(
        <div>
            <div style={visibility} >
                {React.cloneElement(props.children, {toggleVisibility:toggleVisibility})}
            </div>
            <button onClick={()=>toggleVisibility()}>{buttonLabel}</button>
        </div>
    )
}

export default Togglable