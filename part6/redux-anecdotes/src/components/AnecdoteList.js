import React from 'react'

//Reducers
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {newMessage} from '../reducers/messageReducer'

const AnecdoteList = ({store}) =>{
    const anecdotes = store.getState().anecdotes

    const vote = (id, content) => {
        console.log('vote', id)
        store.dispatch(voteAnecdote(id))
        store.dispatch(newMessage(`You voted "${content}"`))
    }

    return(
        <div className='AnecdoteList'>
            <h2>Anecdotes</h2>
        {[...anecdotes].sort((a,b)=>{
            if(a.votes > b.votes) return -1
            if(a.votes < b.votes) return 1
            return 0
        }).map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList