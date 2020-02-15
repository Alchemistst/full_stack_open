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
    let toUpdate = {...votedAnecdote}
    toUpdate.votes += 1
    const result = await axios.put(baseUrl+'/'+votedAnecdote.id, toUpdate)
    return result.data
}

export default { getAll, addAnecdote, voteAnecdote }