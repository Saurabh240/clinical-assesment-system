import Card from "../../components/ui/Card";

export default function ConsentCard({ data }) {
  if (!data) return null;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Consent
      </h2>

      <div className="space-y-2 text-sm">
        <p><strong>Verbal Consent: </strong>{data.verbalConsent ? "Yes" : "No"}</p>
        <p><strong>Substitute Name: </strong>{data.substituteName || "-"}</p>
        <p><strong>Substitute Consent: </strong>{data.substituteConsent ? "Yes" : "No"}</p>
        <p><strong>Relation: </strong>{data.substituteRelation || "N/A"}</p>
      </div>
    </Card>
  );
}
