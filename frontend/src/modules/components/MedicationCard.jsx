

import Card from "../../components/ui/Card";

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, s => s.toUpperCase());
}

export default function MedicationCard({ data }) {
  if (!data) return null;

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-3">
        Medication
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        {Object.entries(data).map(([key, value]) => (
          <p key={key}>
            <strong>{formatLabel(key)}:</strong>{" "}
            <span className={value ? "text-red-600" : "text-gray-400"}>
              {value ? "Yes" : "No"}
            </span>
          </p>
        ))}
      </div>
    </Card>
  );
}



