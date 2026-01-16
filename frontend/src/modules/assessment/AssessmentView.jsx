import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function AssessmentView() {
  const { id } = useParams();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!id) return;

    api
      .get(`/assessments/${id}`)
      .then((res) => {
        setAssessment(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load assessment");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleGeneratePdf = async () => {
    if (!assessment?.id) return;
    setGenerating(true);
    try {
      const res = await api.post(`/assessments/${assessment.id}/generate-pdf`);
      const pdfUrl = res.data.pdfUrl;

      if (pdfUrl) {
        window.open(pdfUrl, "_blank");
      } else {
        alert("PDF generated, but URL is empty");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!assessment || !assessment.data) {
    return <div className="p-6 text-center">No data found</div>;
  }

  const data = assessment.data; // your JSON object

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* <h1 className="text-2xl font-semibold mb-4">Assessment #{assessment.id}</h1> */}

      {/* Patient Info */}
      <Card>
        <h2 className="font-medium mb-2">Patient Information</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>First Name: {data.patient?.firstName}</div>
          <div>Last Name: {data.patient?.lastName}</div>
          <div>DOB: {data.patient?.dob}</div>
          <div>Gender: {data.patient?.gender}</div>
          <div>Phone: {data.patient?.phone}</div>
          <div>Height: {data.patient?.height}</div>
          <div>Weight: {data.patient?.weight}</div>
          <div>Address: {data.patient?.address}</div>
          <div>Health Card No: {data.patient?.healthCardNo}</div>
        </div>
      </Card>

      {/* Consent */}
      <Card>
        <h2 className="font-medium mb-2">Consent</h2>
        <div>
          Verbal Consent: {data.consent?.verbalConsent ? "Yes" : "No"}
          {data.consent?.substituteConsent && (
            <div>
              Substitute Name: {data.consent.substituteName} <br />
              Relation: {data.consent.substituteRelation}
            </div>
          )}
        </div>
      </Card>

      {/* Symptoms */}
      <Card>
        <h2 className="font-medium mb-2">Symptoms</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.symptoms &&
            Object.keys(data.symptoms).map((key) => (
              <div key={key}>
                {key}: {data.symptoms[key] ? "Yes" : "No"}
              </div>
            ))}
        </div>
      </Card>

      {/* Assessment */}
      <Card>
        <h2 className="font-medium mb-2">Assessment Details</h2>
        <div>NKA: {data.assessment?.nka ? "Yes" : "No"}</div>
        <div>Allergies: {data.assessment?.allergies}</div>
        <div>Medication List Attached: {data.assessment?.medicationListAttached ? "Yes" : "No"}</div>
        <div>Notes: {data.assessment?.notes || "-"}</div>
      </Card>

      {/* PDF Actions */}
      <Card>
        <div className="flex justify-between items-center">
          <span className="font-medium">Assessment Report</span>

          <div className="space-x-2">
            {assessment.pdfUrl && (
              <a href={assessment.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">View PDF</Button>
              </a>
            )}

            <Button onClick={handleGeneratePdf} disabled={generating} variant="secondary">
              {generating ? "Generating..." : "Generate PDF"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}


