import Card from "../../components/ui/Card";


function LabelValue({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs "><strong>{label}</strong></span>
      <span className="text-sm  text-gray-500 font-medium">{value || "-"}</span>
    </div>
  );
}





export default function PatientInfoCard({ data }) {
  if (!data) return null;

  const p = data;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Patient Information
      </h2>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <LabelValue label="First Name" value={p.firstName} />
        <LabelValue label="Last Name" value={p.lastName} />
        <LabelValue label="Date of Birth" value={p.dob} />
        <LabelValue label="Gender" value={p.gender} />
          <LabelValue label="Height" value={p.height} />
        <LabelValue label="Weight" value={p.weight} />
        <LabelValue label="Phone" value={p.phone} />
      
        <LabelValue label="Health Card" value={p.healthCardNo} />
        <LabelValue label="Address" value={p.address} />
        
 


      
       
      </div>
    </Card>
  );
}
