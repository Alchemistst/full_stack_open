import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

function App() {
  return (
    <div className="App">

    </div>
  );
}

const renderApp = () => {
  ReactDOM.render(<App/>, document.getElementById('root'))
}

renderApp()

store.subscribe(renderApp)

export default App;
