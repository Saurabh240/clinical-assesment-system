


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

// Import section components
import PatientInfoCard from "../components/PatientInfoCard";
import SymptomsCard from "../components/SymptomsCard";
import CarePlanCard from "../components/CarePlanCard";
import MedicationCard from "../components/MedicationCard";

import FollowUpHistory from "../components/FollowUpHistory";
import ConsentCard from "../components/ConsentCard";
import SignatureCard from "../components/SignatureCard";
import AssessmentCard from "../components/AssessmentCard";
import PrescriberCard from "../components/PrescriberCard";
import EligibilityCard from "../components/EligibilityCard";


export default function AssessmentView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleEdit = () => {
    navigate(`/assessments/${id}/edit`);
  };

  useEffect(() => {
    if (!id) return;

    api
      .get(`/assessments/${id}`)
      .then((res) => setAssessment(res.data))
      .catch(() => setError("Unable to load assessment"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleGeneratePdf = async () => {
    if (!assessment?.id) return;

    const pdfWindow = window.open("", "_blank");

    setGenerating(true);
    try {
      const res = await api.post(`/assessments/${assessment.id}/pdf`);
      const pdfUrl = res.data?.url || res.data?.pdfUrl;

      if (!pdfUrl) {
        pdfWindow?.close();
        alert("PDF generated but URL not returned");
        return;
      }

      pdfWindow.location.href = pdfUrl;
    } catch (err) {
      pdfWindow?.close();
      alert("Error generating PDF");
    } finally {
      setGenerating(false);
    }
  };

  // STATES
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!assessment?.data)
    return <div className="p-6 text-center">No data found</div>;

  const d = assessment.data;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

      


         
<h1 className="text-xl font-semibold">
  Assessment Details
</h1>

<div className="flex items-center gap-2">
    <Button variant="outline" onClick={handleEdit}>
      Edit Assessment
    </Button>
    <Button
      variant="secondary"
      onClick={handleGeneratePdf}
      disabled={generating}
    >
      {generating ? "Generating..." : "Generate PDF"}
    </Button>
  </div>







      </div>


      



      {/* Section Components */}
      <div className="grid md:grid-cols-2 gap-6">
     <PatientInfoCard data={d.patient} />
<SymptomsCard data={d.symptoms} />
<CarePlanCard data={d.carePlan} />
<MedicationCard data={d.medication} />
<ConsentCard data={d.consent} />
<SignatureCard data={d.signature} />
<AssessmentCard data={d.assessment} />
<PrescriberCard data={d.prescriber} />
<div className="md:col-span-2">
<EligibilityCard data={d.eligibility} />
</div>



</div>
<div className="mt-6">
<FollowUpHistory assessmentId={id} 
initialFollowUp={d.followUp}
/>
</div>
      {/* Footer Actions */}
      <Card className="bg-teal-50 border-teal-200">
       <div className="flex flex-col sm:flex-row gap-3 justify-end w-full">

          <Button variant="outline" onClick={handleEdit}
            className="w-full sm:w-auto">
            Edit Assessment
          </Button>

          <Button
            variant="secondary"
            onClick={handleGeneratePdf}
            disabled={generating}
            className="w-full sm:w-auto"
          >
            {generating ? "Generating..." : "Generate PDF"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
