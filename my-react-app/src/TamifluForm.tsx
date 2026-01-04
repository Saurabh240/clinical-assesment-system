import { useState } from "react";
import api from "./api";

export default function TamifluForm() {
  const [id, setId] = useState<number>();
  const [pdf, setPdf] = useState("");

  const data = {
    patient: { firstName: "John", lastName: "Doe", gender: "M" },
    symptoms: { fever: true, cough: true, headache: false },
    carePlan: { rxIssued: true }
  };

  return (
    <>
      <button onClick={async () => {
        const r = await api.post("/assessments", {
          ailmentCode: "OSELTAMIVIR",
          data
        });
        setId(r.data.id);
      }}>
        Save Assessment
      </button>

      {id && (
        <button onClick={async () => {
          const r = await api.post(`/assessments/${id}/pdf`);
          setPdf(r.data.url);
        }}>
          Generate PDF
        </button>
      )}

      {pdf && <a href={pdf} target="_blank">View PDF</a>}
    </>
  );
}
