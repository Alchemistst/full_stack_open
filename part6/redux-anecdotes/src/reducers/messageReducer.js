

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

export const endMessage = () => {
    return {
        type: 'END_MESSAGE'
    }
}

export default reducer