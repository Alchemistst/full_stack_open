

const reducer = (state = '', action) =>{
    if (action.type === 'NEW_MESSAGE'){
        return action.data.message
    }
    if (action.type === 'END_MESSAGE'){
        return ''
    }
    return state
}

export const newMessage = (message) =>{
    return {
        type: 'NEW_MESSAGE',
        data: {message}
    }
}

export const endMessage = () =>{
    return {
        type: 'END_MESSAGE'
    }
}

export const setNotification = (message, count) =>{
    return dispatch => {
        dispatch(newMessage(message))

        const timeOutID = setTimeout(()=>{
            dispatch(endMessage())
        }, count*1000)

        clearTimeout(timeOutID-1)
    }
}

export default reducer