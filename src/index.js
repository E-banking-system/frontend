import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import App from './App';
import rootReducer from './reducers/reducer';
import TestComponent from './components/TestComponent';

// Create the Redux store with the root reducer and apply middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <TestComponent />
  </Provider>,
  document.getElementById('root')
);
