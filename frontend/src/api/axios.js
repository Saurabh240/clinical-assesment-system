import axios from "axios";


const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Required to send the HttpOnly cookie
});

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Required for secure cross-site requests
});

//  Token Management (Access Token only)
export const tokenManager = {
  getAccessToken: () => localStorage.getItem("accessToken"),
  
  setTokens: (accessToken) => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  },

  clearTokens: () => {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];

  },
};

// Initialize
const initToken = tokenManager.getAccessToken();
if (initToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${initToken}`;
}

//  Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    const isAuthRequest = config.url?.includes("/auth/");
    
    if (token && !isAuthRequest) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//  Response Interceptor (Cookie-based Refresh)
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => error ? prom.reject(error) : prom.resolve(token));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || originalRequest._retry) {
      return Promise.reject(error);
    }

    const { status } = error.response;
    const isAuthEndpoint = originalRequest.url?.includes("/auth/");

    if (status === 401 && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
      
        // The browser automatically attaches the 'refresh_token' cookie 
        // because of 'withCredentials: true' and 'Path=/auth/refresh'.
        const { data } = await refreshApi.post("/auth/refresh", {});

        const { accessToken } = data;
        if (!accessToken) throw new Error("No access token in refresh response");

        tokenManager.setTokens(accessToken);
        processQueue(null, accessToken);

       
        if (originalRequest.data && typeof originalRequest.data === 'string') {
          try { originalRequest.data = JSON.parse(originalRequest.data); } catch (e) {}
        }

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenManager.clearTokens();
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

//  Auth API Wrapper
export const authApi = {
  signIn: async (credentials) => {
    const response = await api.post("/auth/signIn", credentials);
    const { accessToken, userId, status, nextStep } = response.data;
    
    // We only save the accessToken. The refreshToken is now a cookie.
    tokenManager.setTokens(accessToken);
    
    return { userId, status, nextStep, accessToken };
  },

  signUp: async (userData) => api.post("/auth/signUp", userData),

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      tokenManager.clearTokens();
      window.location.href = "/login";
    }
  },
};

export default api;