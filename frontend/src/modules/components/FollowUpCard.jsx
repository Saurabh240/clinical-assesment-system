

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function FollowUpSection({ data, onAdd, onEdit }) {
  if (!data) {
    return (
      <Card>
        <p className="text-sm text-gray-500">No follow-up data</p>
      </Card>
    );
  }

  const today = new Date();

  const followupDate = data.date
    ? new Date(data.date)
    : null;

  let overdueDays = 0;

  if (followupDate) {
    overdueDays = Math.floor(
      (today - followupDate) /
      (1000 * 60 * 60 * 24)
    );
  }

  const isOverdue = overdueDays > 0;

  return (
    <Card>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Initial Follow-Up Plan
        </h2>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={onAdd}>
            Add
          </Button>

          <Button
            variant="secondary"
            onClick={() => onEdit(data)}
          >
            Edit
          </Button>
        </div>
      </div>

      {/* Follow-up Info */}
      <div className="space-y-2 text-sm">
        <p>
          <strong>Date:</strong>{" "}
          {data.date || "N/A"}
        </p>

        <p>
          <strong>In Person:</strong>{" "}
          {data.inPerson ? "Yes" : "No"}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {data.phone ? "Yes" : "No"}
        </p>

        <p>
          <strong>PCP Phone:</strong>{" "}
          {data.pcpPhone ? "Yes" : "No"}
        </p>

        <p>
          <strong>PCP Fax:</strong>{" "}
          {data.pcpFax ? "Yes" : "No"}
        </p>

        <p>
          <strong>PCP Notified Date:</strong>{" "}
          {data.pcpNotifiedDate || "N/A"}
        </p>
      </div>

      {/* Overdue Alert */}
      {isOverdue && (
        <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
           Overdue by {overdueDays} days
        </div>
      )}
    </Card>
  );
}
