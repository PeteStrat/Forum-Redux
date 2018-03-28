
import {
  GET_POST_COMMENTS,
  CREATE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../actions/commentActions';

let initialCommentState = {
  commentsArray: []
};

export default (state = initialCommentState, action) => {
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
};
