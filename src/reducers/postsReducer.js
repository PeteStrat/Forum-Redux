import {
  GET_ALL_POSTS,
  CREATE_NEW_POST,
  GET_POST,
  VOTE_POST,
  DELETE_POST,
  EDIT_POST
} from '../actions/postActions';

let initialPostState = {
  postsArray: []
};

export default (state = initialPostState, action) => {
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
};
