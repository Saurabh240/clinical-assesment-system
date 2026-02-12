
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/axios";

export default function FollowUpHistory({ assessmentId }) {
  const [followup, setFollowup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch followup by assessment
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

  // Add OR Edit Followup

const handleAddOrEdit = async () => {
  if (!assessmentId) return;


  const future = new Date();
  future.setDate(future.getDate() + 1);

  const payload = {
    notes: "Patient contacted",
    nextFollowupDate: future.toISOString(), 
    status: followup ? "COMPLETED" : "PENDING"
  };

  try {
    setSaving(true);

    const res = await api.post(
      `/assessments/${assessmentId}/followup`,
      payload
    );

    alert(res.data.message || "Saved successfully");
    fetchFollowup();

  } catch (err) {
    console.error("FULL ERROR:", err.response?.data);
    alert(err.response?.data?.message || "Failed to save");
  } finally {
    setSaving(false);
  }
};





  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Follow-Up History
      </h2>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* No followup */}
      {!loading && !followup && (
        <p>No follow-up recorded</p>
      )}

      {/* Show followup */}
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

      {/* Dynamic Button */}
      <div className="flex gap-2 mt-3">
        <Button
          variant="secondary"
          onClick={handleAddOrEdit}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : followup
            ? "Edit Follow-Up"
            : "Add Follow-Up"}
        </Button>
      </div>
    </Card>
  );
}
