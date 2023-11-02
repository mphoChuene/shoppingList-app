// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Create reducers for your app

const store = configureStore({
  reducer: rootReducer,
});

export default store;
