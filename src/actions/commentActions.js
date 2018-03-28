import axios from 'axios';
import config from './config';

export const EDIT_COMMENT = 'EDIT_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';

const baseUrl = config.baseUrl;
const API_KEY = config.API_KEY;

export function editComment (commentId, newBody, timeEdited) {
  let request = axios.put(`${baseUrl}/comments/${commentId}`, {
    body: newBody,
    timestamp: timeEdited
  },
  {headers: {'Authorization': API_KEY}});

  return {
    type: EDIT_COMMENT,
    payload: request
  };
}

export function voteComment (commentId, direction) {
  let request = axios.post(`${baseUrl}/comments/${commentId}`, {
    option: direction
  }, {headers: {'Authorization': API_KEY}});

  return {
    type: VOTE_COMMENT,
    payload: request
  };
}

export function createComment (comment) {
  let request = axios.post(`${baseUrl}/comments`, {
    id: comment.id,
    parentId: comment.parentId,
    timestamp: comment.timestamp,
    author: comment.author,
    body: comment.body
  },
  {headers: {'Authorization': API_KEY}})
    .catch((error) => {
      console.log(error);
    });

  return {
    type: CREATE_COMMENT,
    payload: request
  };
}

export function deleteComment (commentId) {
  let request = axios.delete(`${baseUrl}/comments/${commentId}`,
    {headers: {'Authorization': API_KEY}});

  return {
    type: DELETE_COMMENT,
    payload: request
  };
}

export function getPostComments (postId) {
  let request = axios.get(`${baseUrl}/posts/${postId}/comments`, {headers: {'Authorization': API_KEY}});

  return {
    type: GET_POST_COMMENTS,
    payload: request
  };
}
