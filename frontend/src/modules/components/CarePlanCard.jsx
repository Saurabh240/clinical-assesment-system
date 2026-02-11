import Card from "../../components/ui/Card";

export default function CarePlanCard({ data }) {
  if (!data) return null;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Care Plan
      </h2>

      <div className="space-y-2 text-sm">
        <p><strong>Care Mode:</strong> {data.careMode || "-"}</p>
        <p><strong>Prescription Issued:</strong> {data.prescriptionIssued ? "Yes" : "No"}</p>
        <p><strong>Notes:</strong> {data.notes || "-"}</p>
      </div>
    </Card>
  );
}
