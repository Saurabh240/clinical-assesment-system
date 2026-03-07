import Card from "../../components/ui/Card";

export default function PrescriberCard({ data }) {
  if (!data) return null;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Prescriber
      </h2>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Name:</strong>{" "}
          {data.firstName || "-"} {data.lastName || "-"}
        </p>

        <p>
          <strong>License No:</strong>{" "}
          {data.licenseNo || "-"}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {data.phone || "-"}
        </p>

        <p>
          <strong>Fax:</strong>{" "}
          {data.faxNo || "-"}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {data.address || "-"}
        </p>
      </div>
    </Card>
  );
}
