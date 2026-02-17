

import Card from "../../components/ui/Card";

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, str => str.toUpperCase());
}

export default function SymptomsCard({ data }) {
  if (!data) return null;

  return (
    <Card className="p-3">
      <h2 className="text-base font-semibold mb-2">
        Symptoms
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-sm">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <span className="font-medium mr-1">
              {formatLabel(key)}:
            </span>

            <span
              className={
                value
                  ? "text-red-600 font-medium"
                  : "text-gray-400"
              }
            >
              {value ? "Yes" : "No"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

