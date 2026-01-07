import { Navigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import DynamicFormRenderer from "../components/userdashboard/DynamicFormRenderer";
import Button from "../components/ui/Button";
import { useState } from "react";

const Assessment = () => {
  const { ailmentId, schema } = useAssessment();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [assessmentId, setAssessmentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  if (!ailmentId || !schema) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = () => {
    const err = {};

    schema.forEach((section) => {
      section.fields.forEach((field) => {
        const val = formData[field.key];

        if (field.required && (val === undefined || val === null)) {
          err[field.key] = "Required";
        }

        if (
          field.rules?.min !== undefined &&
          val !== undefined &&
          Number(val) < field.rules.min
        ) {
          err[field.key] = `Minimum age is ${field.rules.min}`;
        }
      });
    });

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Submit assessment
  const submit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ailmentId,
          assessmentData: formData,
        }),
      });

      const data = await res.json();
      setAssessmentId(data.id);

      await fetchAssessment(data.id); // load saved data
    } catch (err) {
      console.error("Assessment submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch assessment
  const fetchAssessment = async (id) => {
    try {
      const res = await fetch(`/assessments/${id}`);
      const data = await res.json();

      setFormData(data.assessmentData);
    } catch (err) {
      console.error("Failed to fetch assessment", err);
    }
  };
  // genertate pdf
  const generatePdf = async () => {
    if (!assessmentId) return;

    setLoading(true);

    try {
      const res = await fetch(`/assessments/${assessmentId}/pdf`, {
        method: "POST",
      });

      const data = await res.json();
      setPdfUrl(data.pdfUrl);
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <DynamicFormRenderer
        schema={schema}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <div className="flex justify-end gap-4">
        {!assessmentId && (
          <Button onClick={submit} disabled={loading}>
            Submit Assessment
          </Button>
        )}

        {assessmentId && (
          <Button onClick={generatePdf} disabled={loading}>
            Generate PDF
          </Button>
        )}
      </div>

      {pdfUrl && (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Download Assessment PDF
        </a>
      )}
    </div>
  );
};

export default Assessment;
