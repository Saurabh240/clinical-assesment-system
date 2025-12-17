import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8082",
});

// Request Interceptor: Sends the token if it exists
api.interceptors.request.use((config) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData?.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  return config;
});

// Response Interceptor: The "Automatic Refresh" logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Triggered ONLY when a request fails with 401 (Expired Access Token)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        
        // Call the dedicated Refresh API
        const { data } = await axios.post("http://localhost:8082/auth/refresh", {
          refreshToken: userData.refreshToken
        });

        // Save the new access token
        const updatedData = { ...userData, token: data.token };
        localStorage.setItem("userData", JSON.stringify(updatedData));

        // Retry the original failed request
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
        
      } catch (err) {
        // If refresh fails, user session is totally dead
        localStorage.removeItem("userData");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;