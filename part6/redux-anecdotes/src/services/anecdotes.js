import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () =>{
    const result = await axios.get(baseUrl)
    return result.data
}

const addAnecdote = async (newAnecdote) =>{
    const result = await axios.post(baseUrl, newAnecdote)
    return result.data
}

const voteAnecdote = async (votedAnecdote) =>{
    const result = await axios.put(baseUrl+'/')
}

export default { getAll, addAnecdote }