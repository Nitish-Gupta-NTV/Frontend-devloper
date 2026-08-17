import axios from "axios";
import { useAuthStore } from "../context/authStore";
 

//const BASE_URL = "http://10.235.136.47:8080";
const BASE_URL ="http://localhost:8080";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach the access token to every outgoing request.
apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  console.log("ACCESS TOKEN:", accessToken);
  console.log("REQUEST:", config.url);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
   console.log("AUTH HEADER:", config.headers.Authorization);
  return config;
});

// If a request fails with 401, try to refresh the access token once
// and replay the original request. If refresh also fails, log the user out.
let isRefreshing = false;
let pendingQueue = [];

function resolvePendingQueue(error, token = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Don't try to refresh on the refresh call itself, or if we've already retried.
    if (![401,403].includes(status) || originalRequest._retry || originalRequest.url?.includes("/api/auth/refresh")) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until the in-flight refresh resolves.
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const { refreshToken, setAuth, clearAuth, user } = useAuthStore.getState();

    if (!refreshToken) {
      clearAuth();
      isRefreshing = false;
      return Promise.reject(error);
    }

    try {
      // Adjust the payload/response shape to match your backend's actual
      // /api/auth/refresh contract.
      const { data } = await axios.post(`${BASE_URL}/api/auth/refresh-token`, { refreshToken });

      setAuth({
        user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken ?? refreshToken,
      });

      resolvePendingQueue(null, data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      resolvePendingQueue(refreshError, null);
      clearAuth();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;