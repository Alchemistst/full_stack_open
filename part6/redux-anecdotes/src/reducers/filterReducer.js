const reducer = (state='', action) =>{
    if (action.type === 'FILTER'){
        return action.data.value
    }
    return state
}

export const filter = (value) =>{
    return {
        type: 'FILTER',
        data: {value}
    }
}

export default reducer