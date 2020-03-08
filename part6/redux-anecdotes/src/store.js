import { createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'


//Reducers
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    message: messageReducer,
    filter: filterReducer
})
  
export const store = createStore(reducer, applyMiddleware(thunk))
