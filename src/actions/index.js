// Actions
import axios from 'axios';

export const GET_CATEGORIES = 'GET_CATEGORIES';

const baseUrl = 'http://localhost:3001';
const API_KEY = '123';

export function getCategories () {
  let request = axios.get(`${baseUrl}/categories`, {
    headers: { 'Authorization': API_KEY }
  })
    .then((response) => {
      return response.data.categories.map(category => category.name);
    });

  return {
    type: GET_CATEGORIES,
    payload: request
  };
}
