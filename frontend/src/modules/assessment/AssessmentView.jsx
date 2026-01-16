

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

/*
   UI Helpers
*/

function LabelValue({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">
        {value ?? "-"}
      </span>
    </div>
  );
}

function YesNoBadge({ value }) {
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium
        ${value ? "bg-teal-100 text-teal-700" : "bg-gray-200 text-gray-600"}
      `}
    >
      {value ? "Yes" : "No"}
    </span>
  );
}

/*
   Main Component
*/

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
      .then((res) => setAssessment(res.data))
      .catch(() => setError("Unable to load assessment"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleGeneratePdf = async () => {
    if (!assessment?.id) return;

    setGenerating(true);
    try {
      const res = await api.post(
        `/assessments/${assessment.id}/generate-pdf`
      );
      if (res.data?.pdfUrl) {
        window.open(res.data.pdfUrl, "_blank");
      }
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!assessment?.data)
    return <div className="p-6 text-center">No data found</div>;

  const d = assessment.data;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Patient */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <LabelValue label="First Name" value={d.patient?.firstName} />
          <LabelValue label="Last Name" value={d.patient?.lastName} />
          <LabelValue label="DOB" value={d.patient?.dob} />
          <LabelValue label="Gender" value={d.patient?.gender} />
          <LabelValue label="Phone" value={d.patient?.phone} />
          <LabelValue label="Height" value={d.patient?.height} />
          <LabelValue label="Weight" value={d.patient?.weight} />
          <LabelValue label="Health Card No" value={d.patient?.healthCardNo} />
        </div>
        <div className="mt-4">
          <LabelValue label="Address" value={d.patient?.address} />
        </div>
      </Card>

      {/* Consent */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Consent</h2>
        <div className="flex items-center gap-2">
          <span>Verbal Consent</span>
          <YesNoBadge value={d.consent?.verbalConsent} />
        </div>

        {d.consent?.substituteConsent && (
          <div className="mt-3 bg-gray-50 border rounded-lg p-4">
            <LabelValue label="Substitute Name" value={d.consent.substituteName} />
            <LabelValue label="Relation" value={d.consent.substituteRelation} />
          </div>
        )}
      </Card>

      {/* Symptoms */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Symptoms</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(d.symptoms || {}).map(([k, v]) => (
            <span
              key={k}
              className={`px-3 py-1 rounded-full text-sm
                ${v ? "bg-teal-100 text-teal-800" : "bg-gray-200 text-gray-600"}
              `}
            >
              {k.replace(/([A-Z])/g, " $1")}
            </span>
          ))}
        </div>
      </Card>

      {/* Assessment */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Assessment</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span>NKA</span>
            <YesNoBadge value={d.assessment?.nka} />
          </div>
          <LabelValue label="Allergies" value={d.assessment?.allergies} />
          <LabelValue label="sCr" value={d.assessment?.sCr} />
          <LabelValue label="eGFR" value={d.assessment?.eGFR} />
          <LabelValue label="sCr Date" value={d.assessment?.sCrDate} />
          <LabelValue label="eGFR Date" value={d.assessment?.eGFRDate} />
          <div className="flex items-center gap-2">
            <span>Medication List Attached</span>
            <YesNoBadge value={d.assessment?.medicationListAttached} />
          </div>
        </div>
      </Card>

      {/*Care Plan */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Care Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(d.carePlan || {}).map(([k, v]) =>
            typeof v === "boolean" ? (
              <div key={k} className="flex justify-between">
                <span className="text-sm">{k}</span>
                <YesNoBadge value={v} />
              </div>
            ) : (
              <LabelValue key={k} label={k} value={v} />
            )
          )}
        </div>
      </Card>

      {/* Follow Up */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Follow Up</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(d.followUp || {}).map(([k, v]) =>
            typeof v === "boolean" ? (
              <div key={k} className="flex justify-between">
                <span className="text-sm">{k}</span>
                <YesNoBadge value={v} />
              </div>
            ) : (
              <LabelValue key={k} label={k} value={v} />
            )
          )}
        </div>
      </Card>

      {/*  Medication  */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Medication</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(d.medication || {}).map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-sm">{k}</span>
              <YesNoBadge value={v} />
            </div>
          ))}
        </div>
      </Card>

      {/* Prescriber  */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Prescriber</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LabelValue label="First Name" value={d.prescriber?.firstName} />
          <LabelValue label="Last Name" value={d.prescriber?.lastName} />
          <LabelValue label="License No" value={d.prescriber?.licenseNo} />
          <LabelValue label="Phone" value={d.prescriber?.phone} />
          <LabelValue label="Fax" value={d.prescriber?.faxNo} />
          <LabelValue label="Address" value={d.prescriber?.address} />
        </div>
      </Card>

      {/*  Eligibility  */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Eligibility</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex justify-between">
            <span>No Red Flags</span>
            <YesNoBadge value={d.eligibility?.noRedFlags} />
          </div>
          <div className="flex justify-between">
            <span>Clinical Judgment</span>
            <YesNoBadge value={d.eligibility?.clinicalJudgment} />
          </div>
          <LabelValue label="Symptom Onset" value={d.eligibility?.symptomOnsetDate} />
          <LabelValue label="Positive Test Date" value={d.eligibility?.positiveTestDate} />
        </div>
      </Card>

      {/*  Signature  */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Signature</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LabelValue label="Pharmacist Name" value={d.signature?.pharmacistName} />
          <LabelValue label="OCP Number" value={d.signature?.ocpNumber} />
          <LabelValue label="Date" value={d.signature?.date} />
        </div>
      </Card>

      {/* PDF */}
      <Card className="bg-teal-50 border-teal-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-teal-800">
            Assessment Report
          </span>
          <Button variant="secondary" onClick={handleGeneratePdf} disabled={generating}>
            {generating ? "Generating..." : "Generate PDF"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
