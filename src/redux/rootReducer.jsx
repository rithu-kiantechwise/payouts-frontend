// rootReducer.js
import { combineReducers } from 'redux';
import modalReducer from './modalSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  modal: modalReducer,
  user: userReducer
  // Add other reducers if needed
});

export default rootReducer;
