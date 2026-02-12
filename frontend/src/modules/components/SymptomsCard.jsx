
import Card from "../../components/ui/Card";

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, str => str.toUpperCase());
}

export default function SymptomsCard({ data }) {
  if (!data) return null;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Symptoms
      </h2>

     
       <div className="space-y-2 text-sm">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="flex  items-center gap-2 p-2 flex-wrap"
          >
            <span><strong>{formatLabel(key)}:</strong></span>
            <span className={value ? "text-red-600" : "text-gray-400"}>
              {value ? "Yes" : "No"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
