import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './reducers/store';
import 'semantic-ui-css/semantic.min.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
