import React from 'react'
import { connect } from 'react-redux'

//Reducers
import {addAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) =>{

    const newAnecdote = (e) => {
        e.preventDefault()
        props.addAnecdote(e.target.anecdote.value)
        e.target.anecdote.value = ''
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

export default connect (null, {addAnecdote}) (AnecdoteForm)