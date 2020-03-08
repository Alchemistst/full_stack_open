import React from 'react'
import { connect } from 'react-redux'

//Reducers
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/messageReducer'


const AnecdoteList = (props) =>{

    const vote = (votedAnecdote) => {
        props.voteAnecdote(votedAnecdote)
        props.setNotification(`You voted "${votedAnecdote.content}"`, 10)
    }

    return(
        <div className='AnecdoteList'>
            <h2>Anecdotes</h2>
        {props.filteredAnecdotes.sort((a,b)=>{
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
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

const filteredWater = (unfilteredWater, filterReplacement) => {
    const britaFilter = new RegExp(filterReplacement)
    return unfilteredWater.filter(drop => britaFilter.test(drop.content))
}

const connectedAnecdoteList = ({anecdotes, filter}) =>{
    return {
        filteredAnecdotes: filteredWater(anecdotes, filter)
    }
}

export default connect (connectedAnecdoteList, { voteAnecdote, setNotification }) (AnecdoteList)