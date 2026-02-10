import axios from "axios";


const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
});

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
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
    
    const status = error.response ? error.response.status : null;

  
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      
      if (originalRequest.url?.includes("/auth/refresh")) {
        tokenManager.clearTokens();
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
      
        const { data } = await refreshApi.post("/auth/refresh");
        const newToken = data.accessToken;

        tokenManager.setTokens(newToken);
        processQueue(null, newToken);

        // RETRY the original list API with the NEW token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); 
      } catch (err) {
        processQueue(err, null);
        tokenManager.clearTokens();
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(err);
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


