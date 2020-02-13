import React from 'react'

//Reducers
import {addAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) =>{

    const newAnecdote = (e) => {
        e.preventDefault()
        store.dispatch(addAnecdote(e.target.anecdote.value))
    }
    
    return(
        <div className='AnecdoteForm'>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm