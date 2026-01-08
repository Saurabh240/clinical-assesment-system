import api from "../api/axios";

// GET /ailments
export const getAilments = () => {
  return api.get("/ailments");
};

// GET /ailments/{code}
export const getAilmentByCode = (code) => {
  return api.get(`/ailments/${code}`);
};
