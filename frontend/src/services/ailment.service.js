// services/ailment.service.js
import api from "../api/axios";

export const getAilments = () => api.get("/ailments");

export const getAilmentByCode = async (code) => {
  try {
    const res = await api.get(`/ailments/${code}`);
    return res.data?.data || res.data || null;  // flexible extraction
  } catch (error) {
    console.error(`Failed to fetch ailment ${code}:`, error);
    throw error;
  }
};