import { api } from './client.js';
export const sendContact = (payload) =>
  api('/contact', { method: 'POST', body: JSON.stringify(payload) });
