import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import blogsReducer from './blogsReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import userStatsReducer from './userStatsReducer';

const combinedReducers = combineReducers({
  blogs: blogsReducer,
  user: userReducer,
  message: messageReducer,
  stats: userStatsReducer,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;
