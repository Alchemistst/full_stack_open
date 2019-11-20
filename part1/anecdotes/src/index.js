import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleclick, name}) =>{
    return(
        <button onClick={handleclick}>{name}</button>
    )
}

const App = (props) =>{
    //State variables
    const [selected, setSelected] = useState(0)
    const [scores, setScores] = useState(anecdotes.map(()=>0)) //Each position matches and holds the score for each one of the anecdotes. 
    
    //Other variables
    let mostUpvotedSelected = scores.indexOf(Math.max(...scores)) //Index of the most upvoted anecdote, considering that scores and anecdotes are mapped

    //Helper functions
    const nextAnecdote = ()=>{
        //Function to handle "Next anecdote" button click. State is changed to a random number regardless of the length of the array of anecdotes.
        let randomPick = Math.round(Math.random()*(anecdotes.length-1))
        
        //Clause to ensure there's no repetition
        if (selected === randomPick) {
            nextAnecdote()
        }else{
            setSelected(randomPick)
        }
        
    } 
    
    const upvote = () =>{
        //Function for handling "Upvote" button. Increments score and updates score array.
        let scoresCopy = [...scores]
        scoresCopy[selected] ++
        setScores(scoresCopy)
    }
    
    return(
        <div>
            <h1>Anecdote of the day</h1>
            <div>
                {props.anecdotes[selected]}
            </div>
            <div>
                {scores[selected]} upvotes
            </div>
            <Button name="Upvote" handleclick={upvote}/>
            <Button name="Next anecdote!" handleclick={nextAnecdote}/>
            <h1>Most popular anecdote</h1>
            <div>
                {props.anecdotes[mostUpvotedSelected]}
            </div>
            <div>
                {scores[mostUpvotedSelected]} upvotes
            </div>

        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'

]


ReactDOM.render(
    <App anecdotes={anecdotes} />, 
    document.getElementById('root')
);