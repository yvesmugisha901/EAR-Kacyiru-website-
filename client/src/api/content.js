import { api } from './client.js';
export const getSermons = ({ q = '', language = '', limit = '' } = {}) =>
  api(`/sermons?${new URLSearchParams({ q, language, limit })}`);
export const getEvents = (limit = '') => api(`/events?${new URLSearchParams({ limit })}`);
export const getMinistries = () => api('/ministries');
export const registerForEvent = (id, body) => api(`/events/${id}/register`, { method: 'POST', body: JSON.stringify(body) });
export const sendPrayer = (body) => api('/prayer', { method: 'POST', body: JSON.stringify(body) });
