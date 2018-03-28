import axios from 'axios';
import config from './config';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const CREATE_NEW_POST = 'CREATE_NEW_POST';
export const GET_POST = 'GET_POST';
export const VOTE_POST = 'VOTE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

const baseUrl = config.baseUrl;
const API_KEY = config.API_KEY;

export function getAllPosts (category) {
  let request;
  category === 'all'
    ? request = axios.get(`${baseUrl}/posts`, {headers: {'Authorization': API_KEY}})
    : request = axios.get(`${baseUrl}/${category}/posts`, {headers: {'Authorization': API_KEY}});

  return {
    type: GET_ALL_POSTS,
    payload: request
  };
}

export function createNewPost (post) {
  let request = axios.post(`${baseUrl}/posts`, {
    id: post.id,
    timestamp: post.timestamp,
    title: post.title,
    author: post.author,
    body: post.body,
    category: post.category
  },
  {headers: {'Authorization': API_KEY}})
    .catch((error) => {
      console.log(error);
    });

  return {
    type: CREATE_NEW_POST,
    payload: request
  };
}

export function getPost (id) {
  let request = axios.get(`${baseUrl}/posts/${id}`, {headers: {'Authorization': API_KEY}});

  return {
    type: GET_POST,
    payload: request
  };
}

export function votePost (postId, direction) {
  let request = axios.post(`${baseUrl}/posts/${postId}`, {
    option: direction
  }, {headers: {'Authorization': API_KEY}});

  return {
    type: VOTE_POST,
    payload: request
  };
}

export function editPost (postId, newTitle, newBody) {
  let request = axios.put(`${baseUrl}/posts/${postId}`, {
    title: newTitle,
    body: newBody
  },
  {headers: {'Authorization': API_KEY}});

  return {
    type: EDIT_POST,
    payload: request
  };
}

export function deletePost (postId) {
  let request = axios.delete(`${baseUrl}/posts/${postId}`,
    {headers: {'Authorization': API_KEY}});

  return {
    type: DELETE_POST,
    payload: request
  };
}
