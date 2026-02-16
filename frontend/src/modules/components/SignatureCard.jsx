import Card from "../../components/ui/Card";

export default function SignatureCard({ data }) {
  if (!data) return null;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Signature
      </h2>

      <div className="space-y-2 text-sm">
        <p><strong>Date: </strong>{data.date || "-"}</p>
        <p><strong>OCP Number: </strong>{data.ocpNumber || "-"}</p>
        <p><strong>Pharmacist Name: </strong>{data.pharmacistName || "-"}</p>
       
      </div>
    </Card>
  );
}
