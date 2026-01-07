import api from "../api/axios";

// POST /assessments
export const createAssessment = (payload) => {
  return api.post("/assessments", payload);
};

// POST /assessments/{id}/pdf
export const generateAssessmentPDF = (id) => {
  return api.post(`/assessments/${id}/pdf`);
};

// GET /assessments/{id}
export const getAssessmentById = (id) => {
  return api.get(`/assessments/${id}`);
};
