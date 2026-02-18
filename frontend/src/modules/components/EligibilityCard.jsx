import Card from "../../components/ui/Card";

export default function EligibilityCard({ data }) {
  if (!data) return null;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Eligibility
      </h2>

      <div className="space-y-2 text-sm">
        <p>
          <strong>No Red Flags:</strong>{" "}
          {data.noRedFlags ? "Yes" : "No"}
        </p>

        <p>
          <strong>Clinical Judgment:</strong>{" "}
          {data.clinicalJudgment ? "Yes" : "No"}
        </p>

        <p>
          <strong>Positive Test Date:</strong>{" "}
          {data.positiveTestDate || "-"}
        </p>

        <p>
          <strong>Symptom Onset Date:</strong>{" "}
          {data.symptomOnsetDate || "-"}
        </p>

        <p>
          <strong>Outbreak Diagnosis:</strong>{" "}
          {data.outbreakDiagnosis ? "Yes" : "No"}
        </p>
      </div>
    </Card>
  );
}
