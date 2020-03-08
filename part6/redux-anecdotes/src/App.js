import React from 'react';
import { useEffect } from 'react'
import { connect } from 'react-redux'

//Components
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

//Reducers
import {anecdotesInit} from './reducers/anecdoteReducer'

const App = ({anecdotesInit}) => {

  useEffect(() => {
    anecdotesInit()
  }, [anecdotesInit])

  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default connect(null, {anecdotesInit}) (App)