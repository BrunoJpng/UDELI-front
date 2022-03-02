import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://udeli-api.herokuapp.com/api/v1',
  withCredentials: true
});