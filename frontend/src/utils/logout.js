
import api from "../api/axios"; 

export const logoutUser = async () => {
  try {
    
    await api.post("/auth/logout"); 
  } catch (err) {
    // If it's 403, the server doesn't recognize your session/token
    console.error("Server denied logout:", err.response?.status);
  } finally {
    localStorage.removeItem("accessToken");
    sessionStorage.clear();
    window.location.replace("/login");
  }
};




