import { combineReducers } from 'redux';
import modalReducer from './modalSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  modal: modalReducer,
  user: userReducer,
  
});

export default rootReducer;
