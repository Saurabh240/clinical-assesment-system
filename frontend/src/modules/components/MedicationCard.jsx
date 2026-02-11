import Card from "../../components/ui/Card";

export default function MedicationCard({ data }) {
  if (!data) return null;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Medication
      </h2>

      <div className="space-y-2 text-sm">
        {Object.entries(data).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value ? "Yes" : "No"}
          </p>
        ))}
      </div>
    </Card>
  );
}


