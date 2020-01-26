import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/'

let token = null

const getToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const result = await axios.get(baseUrl+'blogs/')
    return result.data
}

const logIn = async (credentials) => {
    const result = await axios
        .post(baseUrl+'login/', credentials)
    
    return result.data
}

const newBlog = async (data) => {
    const result = await axios
        .post(baseUrl+'blogs/', data ,{headers: {Authorization: token}})

    return result.data
}

export default { getAll, logIn, newBlog, getToken }