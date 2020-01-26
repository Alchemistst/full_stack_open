import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/'

const getAll = async () => {
    const result = await axios.get(baseUrl+'blogs/')
    return result.data
}

const logIn = async (credentials) => {
    const result = await axios
        .post(baseUrl+'login/', credentials)
    
    return result.data
}

export default { getAll, logIn }