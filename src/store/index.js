// src/store.js or wherever you create your Redux store

import { createStore } from 'redux';
import rootReducer from './reducers'; // Assuming you have a root reducer

const persistedState = {
  auth: {
    token: localStorage.getItem('token'),
    userType: localStorage.getItem('userType'),
  },
  // other initial state if needed
};

const store = createStore(
  rootReducer,
  persistedState,
  // applyMiddleware(), // Apply any middleware like thunk
);

export default store;

