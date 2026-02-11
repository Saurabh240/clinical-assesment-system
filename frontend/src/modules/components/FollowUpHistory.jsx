import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/axios";

export default function FollowUpHistory({ assessmentId }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!assessmentId) return;

    api
      .get("/followups", { params: { assessmentId } })
      .then(res => setList(res.data || []))
      .catch(err => console.error(err));
  }, [assessmentId]);

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Follow-Up History
      </h2>

      {list.length === 0 ? (
        <p>No follow-ups recorded</p>
      ) : (
        list.map((f, i) => (
          <div key={i} className="border p-3 rounded mb-2">
          
           
            <p>Patient: {f.patientName}</p>
            <p>Ailment: {f.ailment}</p>
             <p>Overdue Days: {f.overdueDays}</p>
            <p>Last Follow-up: {f.lastFollowupDate || "N/A"}</p>
          </div>
        ))
      )}

      <Button variant="secondary" className="mt-3">
        Add Follow-Up
      </Button>


    </Card>
  );
}
