import { createStore } from 'redux';
import { combineReducers } from 'redux';
import users from '../modules/usersSlice.js';

const rootReducer = combineReducers({
  users,
});
const store = createStore(rootReducer);

export default store;
