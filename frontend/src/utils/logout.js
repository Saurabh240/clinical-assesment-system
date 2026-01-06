import api from "../api/axios";

export const logoutUser = async () => {
  try {
    console.log("Calling logout API");
    // invalidate backend session / refresh token
    await api.post("/auth/logout");
  } catch (err) {
    console.error("Logout failed:", err);
    // ignore backend errors (user might already be logged out)
  } finally {
    // clear frontend auth state
    localStorage.clear();
     sessionStorage.clear();
    // hard redirect to reset app state
    window.location.replace("/login");
  }
};
