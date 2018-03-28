// Reducers
import { combineReducers } from 'redux';
import {
  GET_CATEGORIES
} from '../actions';

import {
  GET_ALL_POSTS,
  CREATE_NEW_POST,
  GET_POST,
  VOTE_POST,
  DELETE_POST,
  EDIT_POST
} from '../actions/postActions';

import {
  GET_POST_COMMENTS,
  CREATE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../actions/commentActions';


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

let initialPostState = {
  postsArray: []
};

function posts (state = initialPostState, action) {
  switch (action.type) {
    case GET_ALL_POSTS :
      return {
        ...state,
        postsArray: action.payload.data
      };
    case CREATE_NEW_POST :
      return {
        ...state,
        postsArray: [...state['postsArray'], action.payload.data]
      };
    case GET_POST :
      return {
        ...state,
        currentPost: action.payload.data
      };
    case VOTE_POST :
      return {
        ...state,
        postsArray: state.postsArray.map((post) => {
          if (post.id === action.payload.data.id) {
            post.voteScore = action.payload.data.voteScore;
          }
          return post;
        }),
        currentPost: {
          ...state['currentPost'],
          voteScore: action.payload.data.voteScore
        }
      };
    case EDIT_POST :
      return {
        ...state,
        postsArray: state.postsArray.map((post) => {
          if (post.id === action.payload.data.id) {
            return action.payload.data;
          }
          return post;
        }),
        currentPost: action.payload.data
      };
    case DELETE_POST :
      return {
        ...state,
        postsArray: state.postsArray.filter(post => post.id !== action.payload.data.id),
        currentPost: {}
      };
    default :
      return state;
  }
}

let initialCommentState = {
  commentsArray: []
};

function comments (state = initialCommentState, action) {
  switch (action.type) {
    case GET_POST_COMMENTS :
      return {
        ...state,
        commentsArray: action.payload.data
      };
    case CREATE_COMMENT :
      return {
        ...state,
        commentsArray: [...state['commentsArray'], action.payload.data]
      };
    case VOTE_COMMENT :
      return {
        ...state,
        commentsArray: state.commentsArray.map((comment, index) => {
          if (comment.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return comment;
          }
        })
      };
    case EDIT_COMMENT :
      return {
        ...state,
        commentsArray: state.commentsArray.map((comment, index) => {
          if (comment.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return comment;
          }
        })
      };
    case DELETE_COMMENT :
      return {
        ...state,
        commentsArray: state.commentsArray.filter(comment =>
          comment.id !== action.payload.data.id
        )
      };
    default :
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
  categories
});
