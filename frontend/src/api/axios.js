/*import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REFRESH_BASE_URL = import.meta.env.VITE_REFRESH_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});


const getUserData = () => {
  try {
    const raw = localStorage.getItem("userData");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};


api.interceptors.request.use((config) => {
  const userData = getUserData();

  if (userData?.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }

  return config;
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const userData = getUserData();
      if (!userData?.refreshToken) {
        localStorage.removeItem("userData");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      //  If refresh already in progress, queue request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${REFRESH_BASE_URL}/auth/refresh`,
          { refreshToken: userData.refreshToken }
        );

        const updatedUser = {
          ...userData,
          token: data.token,
        };

        localStorage.setItem("userData", JSON.stringify(updatedUser));

        api.defaults.headers.Authorization = `Bearer ${data.token}`;
        processQueue(null, data.token);

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("userData");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;*/
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Helpers
const getUserData = () => {
  try {
    return JSON.parse(localStorage.getItem("userData"));
  } catch {
    return null;
  }
};

// REQUEST 
api.interceptors.request.use((config) => {
  const userData = getUserData();

  if (userData?.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }

  return config;
});

// RESPONSE 
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Ignore refresh endpoint itself
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const userData = getUserData();
      if (!userData?.refreshToken) {
        localStorage.removeItem("userData");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Queue if refresh already running
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await api.post(
          "/auth/refresh",
          { refreshToken: userData.refreshToken },
          { headers: { Authorization: "" } }
        );

        const updatedUser = {
          ...userData,
          token: data.token,
        };

        localStorage.setItem("userData", JSON.stringify(updatedUser));
        processQueue(null, data.token);

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        localStorage.removeItem("userData");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

