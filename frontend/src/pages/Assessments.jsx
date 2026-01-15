import { useEffect, useState } from "react";
import AilmentSelect from "../components/assessment/AilmentSelect";
import DynamicAssessmentForm from "../components/assessment/DynamicAssessmentForm";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { getAilments } from "../services/ailment.service";
import useAssessment from "../hooks/useAssessment";

export default function Assessments() {
  const [ailments, setAilments] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const {
    template,
    loading,
    error,
    submitting,
    assessmentId,
    pdfReady,
    loadTemplate,
    submitAssessment,
    generatePdf,
    hasSections,
  } = useAssessment();

  // Load all available ailments
  useEffect(() => {
    let mounted = true;
    const fetchAilments = async () => {
      try {
        const res = await getAilments();
        if (mounted) setAilments(res.data || []);
      } catch (err) {
        console.error("Failed to load ailments list", err);
      }
    };
    fetchAilments();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAilmentChange = (code) => {
    setSelectedCode(code);
    setPdfUrl(null);
    loadTemplate(code);
  };

  const handleSubmit = async (formData) => {
    // formData = { consent: {...}, patient: {...}, symptoms: {...}, ... }
    const payload = {
      ailmentCode: selectedCode,
      data: formData, // ← this is what your backend expects
    };

    try {
      await submitAssessment(payload);
    } catch (err) {
      // error already handled in hook
    }
  };

  const handleGeneratePdf = async () => {
    const result = await generatePdf();
    if (result?.url) {
      setPdfUrl(result.url);
    }
  };

  const handleReset = () => {
    setSelectedCode("");
    setPdfUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Global Error */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Ailment Selection */}
        {!assessmentId && (
          <Card shadow="md" className="bg-white">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Select Medical Condition / Ailment
            </h2>
            <AilmentSelect
              ailments={ailments}
              value={selectedCode}
              onChange={handleAilmentChange}
              loading={loading}
            />
          </Card>
        )}

        {/* Loading State */}
        {loading && selectedCode && (
          <Card className="bg-white text-center py-12">
            <p className="text-gray-600">Loading assessment form...</p>
          </Card>
        )}

        {/* Form - only when we have valid sections */}
        {hasSections && !assessmentId && !loading && (
          <DynamicAssessmentForm
            config={template}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}

        {/* Success & PDF Section */}
        {pdfReady && assessmentId && (
          <Card className="bg-green-50 border border-green-200">
            <div className="p-6 space-y-6 text-center">
              <h3 className="text-xl font-medium text-green-800">
                Assessment Submitted Successfully!
              </h3>

              {!pdfUrl ? (
                <Button
                  onClick={handleGeneratePdf}
                  variant="success"
                  size="lg"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Generating PDF..." : "Generate PDF Report"}
                </Button>
              ) : (
                <div className="space-y-4">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition"
                  >
                    Open PDF Report
                  </a>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
