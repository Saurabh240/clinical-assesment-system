


import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/axios";

export default function FollowUpHistory({ assessmentId }) {
  const [followup, setFollowup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
const [errorMsg, setErrorMsg] = useState("");



  const fetchFollowup = async () => {
    if (!assessmentId) return;

    try {
      setLoading(true);

      const res = await api.get(
        `/assessments/${assessmentId}/followup`
      );

      setFollowup(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setFollowup(null);
      } else {
        console.error("Fetch error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowup();
  }, [assessmentId]);


  const handleAdd = async () => {
    if (!assessmentId) return;

    const future = new Date();
    future.setDate(future.getDate() + 1);

    const payload = {
      notes: "New follow-up created",
      nextFollowupDate: future.toISOString(),
      status: "PENDING",
    };

 try {
  setSaving(true);

  const res = await api.post(
    `/assessments/${assessmentId}/followup`,
    payload
  );

  setSuccessMsg(res.data.message || "Follow-up saved");
  setErrorMsg("");

  fetchFollowup();

} catch (err) {
  console.error(err);
  setErrorMsg("Failed to add follow-up");
  setSuccessMsg("");

} finally {
  setSaving(false);
}
  };

 
 const handleEdit = async () => {
  if (!assessmentId || !followup) return;

  const future = new Date();
  future.setDate(future.getDate() + 2);

  const payload = {
    notes: "Follow-up updated",
    nextFollowupDate:
      followup.nextFollowupDate ||
      future.toISOString(),
    status: "COMPLETED",
  };

 try {
  setSaving(true);

  const res = await api.post(
    `/assessments/${assessmentId}/followup`,
    payload
  );

  setSuccessMsg(res.data.message || "Updated");
  setErrorMsg("");

  fetchFollowup();

} catch (err) {
  console.error(err);
  setErrorMsg("Failed to update follow-up");
  setSuccessMsg("");

} finally {
  setSaving(false);
}

 };
  return (
    <Card>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Follow-Up History
        </h2>

        <div className="flex gap-2">
      
          <Button
            variant="secondary"
            onClick={handleAdd}
            disabled={saving}
          >
            + Add
          </Button>

     
          <Button
            variant="secondary"
            onClick={handleEdit}
            disabled={!followup || saving}
            className="flex items-center gap-2"
          >
           
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
            Edit
          </Button>
        </div>
      </div>
       
      {successMsg && (
  <div className="bg-green-100 text-green-700 p-2 rounded mb-2">
    {successMsg}
  </div>
)}

{errorMsg && (
  <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
    {errorMsg}
  </div>
)}




  
      {loading && <p>Loading...</p>}

      {!loading && !followup && (
        <p>No follow-up recorded</p>
      )}

      {followup && (
        <div className="border p-3 rounded mb-2">
          <p>
            <strong>Status:</strong> {followup.status}
          </p>

          <p>
            <strong>Last Follow-up:</strong>{" "}
            {followup.lastFollowupDate || "N/A"}
          </p>

          <p>
            <strong>Next Follow-up:</strong>{" "}
            {followup.nextFollowupDate || "N/A"}
          </p>
        </div>
      )}
    </Card>
  );
}
