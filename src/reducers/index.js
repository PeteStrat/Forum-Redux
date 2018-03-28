// Reducers
import { combineReducers } from 'redux';
import {
  GET_CATEGORIES
} from '../actions';

import posts from './postsReducer';
import comments from './commentsReducer';

function categories (state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categoriesArray: action.payload
      };
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
  categories
});
