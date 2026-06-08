import axios from 'axios';

/**
 * Pre-configured Axios instance for the (future) real backend.
 * The app currently runs entirely on the mock layer (src/api/mock), but every
 * module's api/ functions are written so they can swap to this client later.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.message ?? error?.message ?? 'Unexpected network error';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
