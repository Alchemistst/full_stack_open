import anecdoteServices from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type){
    case 'ANECDOTES_INIT':
      return action.data.anecdotes

    case 'VOTE':
      const index  = state.findIndex(a => a.id === action.data.updatedAnecdote.id)
      let newState = [...state]
      newState.splice(index,1,action.data.updatedAnecdote)
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

export const voteAnecdote = (votedAnecdote) =>{
  return async dispatch => {
    const updatedAnecdote = await anecdoteServices.voteAnecdote(votedAnecdote)
    dispatch(
      {type: 'VOTE',
      data: {updatedAnecdote}
    })
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