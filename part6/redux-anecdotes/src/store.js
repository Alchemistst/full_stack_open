import { createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

//Reducers
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import { applyMiddleware } from 'redux'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    message: messageReducer,
    filter: filterReducer
})
  
export const store = createStore(reducer, applyMiddleware(thunk))
