

import Card from "../../components/ui/Card";

function Row({ label, value }) {
  return (
    <div className="text-sm leading-tight">
      <span className="font-semibold">{label}: </span>
      <span className="text-gray-600">{value || "-"}</span>
    </div>
  );
}

export default function PatientInfoCard({ data }) {
  if (!data) return null;

  const p = data;

  return (
    <Card className="p-3 h-fit">
      <h2 className="text-base font-semibold mb-2">
        Patient Information
      </h2>


      <div className="grid grid-cols-2 gap-x-6 gap-y-1">

        <Row label="First Name" value={p.firstName} />
        <Row label="Last Name" value={p.lastName} />

        <Row label="DOB" value={p.dob} />
        <Row label="Gender" value={p.gender} />

        <Row label="Height" value={p.height} />
        <Row label="Weight" value={p.weight} />

        <Row label="Phone" value={p.phone} />
        <Row label="Health Card" value={p.healthCardNo} />


        <div className="col-span-2 pt-1">
          <Row label="Address" value={p.address} />
        </div>

      </div>
    </Card>
  );
}
