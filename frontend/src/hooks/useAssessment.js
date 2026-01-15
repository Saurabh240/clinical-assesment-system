import { useState } from "react";
import {
  createAssessment,
  generateAssessmentPDF,
} from "../services/assessment.service";
import { getAilmentByCode } from "../services/ailment.service";

export default function useAssessment() {
  const [template, setTemplate] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [pdfReady, setPdfReady] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load and transform backend response into template config
   */
  const loadTemplate = async (code) => {
    if (!code) return;

    setLoading(true);
    setError(null);
    setTemplate(null);
    setAssessmentId(null);
    setPdfReady(false);

    try {
      const response = await getAilmentByCode(code);

      // Extract the template from fieldsConfig.sections
      let templateData = null;

      if (
        response?.fieldsConfig?.sections &&
        Array.isArray(response.fieldsConfig.sections)
      ) {
        templateData = {
          sections: response.fieldsConfig.sections,
        };
      } else if (response?.sections) {
        // fallback if they decide to flatten it later
        templateData = response;
      }

      if (!templateData || !Array.isArray(templateData.sections)) {
        throw new Error("Invalid template format: sections array not found");
      }
      setTemplate(templateData);
    } catch (err) {
      console.error("Failed to load template:", err);
      setError(err.message || "Failed to load assessment template");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Submit assessment JSON EXACTLY as backend expects
   */
  const submitAssessment = async (payload) => {
    if (!payload) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await createAssessment(payload);
      setAssessmentId(res?.data?.id || res?.data?.assessmentId);
      setPdfReady(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit assessment");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Generate PDF
   */
  const generatePdf = async () => {
    if (!assessmentId) return null;

    setLoading(true);
    setError(null);

    try {
      const res = await generateAssessmentPDF(assessmentId);
      return res?.data || null;
    } catch (err) {
      console.error(err);
      setError("Failed to generate PDF");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Helper: Format keys to human-readable labels
  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();

  // Helper: Customize required fields (expand based on your needs)
  const isRequired = (fieldKey) => {
    // Examples: make key fields required
    const requiredKeys = [
      "firstName",
      "lastName",
      "dob",
      "verbalConsent",
      "noRedFlags",
    ];
    return requiredKeys.includes(fieldKey);
  };

  return {
    template,
    assessmentId,
    pdfReady,
    loading,
    submitting,
    error,
    loadTemplate,
    submitAssessment,
    generatePdf,
    hasSections: !!template && Array.isArray(template.sections),
  };
}
