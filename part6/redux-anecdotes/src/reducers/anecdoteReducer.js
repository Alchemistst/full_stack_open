import anecdoteServices from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type){
    case 'ANECDOTES_INIT':
      return action.data.anecdotes

    case 'VOTE':
      let newState = [...state]
      const index  = newState.findIndex(a => a.id === action.data.id)
      newState[index].votes += 1
      return newState  

    case 'ADD':
      const newAnecdote = action.data.newAnecdote
      return state.concat(newAnecdote)

    default:
      return state
  }
}

export const anecdotesInit = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'ANECDOTES_INIT',
      data: {anecdotes}
    })
  }
}

export const voteAnecdote = (id) =>{
  return {
    type: 'VOTE',
    data: {id}
  }
}

export const addAnecdote = (content) =>{
  return async (dispatch) => {
    const anecdote = {
      content: content,
      votes: 0
    }
    const newAnecdote = await anecdoteServices.addAnecdote(anecdote)
    dispatch({
      type: 'ADD',
      data: {newAnecdote}
    })
  }
}

export default reducer