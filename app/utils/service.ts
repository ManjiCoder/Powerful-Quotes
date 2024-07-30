import axios from 'axios';
export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

export const service = axios.create({
  url: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

export const sendRequst = async () => {
  console.log(service.getUri);
  const { data } = await service.get('/quotes');
  return data;
};
