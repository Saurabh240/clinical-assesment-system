import Card from "../../components/ui/Card";

export default function AssessmentCard({ data }) {
  if (!data) return null;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Assessment
      </h2>

      <div className="space-y-2 text-sm">
        <p><strong>Notes:</strong> {data.notes || "-"}</p>

        <p><strong>Allergies:</strong> {data.allergies || "-"}</p>

        <p>
          <strong>Other Pharmacy:</strong>{" "}
          {data.otherPharmacy ? "Yes" : "No"}
        </p>

        <p>
          <strong>Liver Impairment:</strong>{" "}
          {data.liverImpairment === "true" ? "Yes" : "No"}
        </p>

        <p>
          <strong>Renal Impairment:</strong>{" "}
          {data.renalImpairment === "true" ? "Yes" : "No"}
        </p>

        <p>
          <strong>Medication List Attached:</strong>{" "}
          {data.medicationListAttached ? "Yes" : "No"}
        </p>

        <p>
          <strong>Pregnancy/Breastfeeding:</strong>{" "}
          {data.pregnancyBreastfeeding === "true" ? "Yes" : "No"}
        </p>
      </div>
    </Card>
  );
}
