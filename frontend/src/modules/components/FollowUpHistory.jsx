

import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/axios";

export default function FollowUpHistory({ assessmentId , initialFollowUp = null,}) {
  const [followup, setFollowup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    notes: "",
    nextFollowupDate: "",
    status: "PENDING",
  });


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
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowup();
  }, [assessmentId]);


  const openAddForm = () => {
    setIsEdit(false);
    setFormData({
      notes: "",
      nextFollowupDate: "",
      status: "PENDING",
    });
    setShowForm(true);
  };


  const openEditForm = () => {
    if (!followup) return;

    setIsEdit(true);
    setFormData({
      notes: followup.notes || "",
      nextFollowupDate: followup.nextFollowupDate
        ? followup.nextFollowupDate.slice(0, 16)
        : "",
      status: followup.status || "PENDING",
    });

    setShowForm(true);
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async () => {
    if (!assessmentId) return;

    try {
      setSaving(true);

      const payload = {
        ...formData,
        nextFollowupDate: new Date(
          formData.nextFollowupDate
        ).toISOString(),
      };

      const res = await api.post(
        `/assessments/${assessmentId}/followup`,
        payload
      );

      setSuccessMsg(
        res.data.message || (isEdit ? "Updated" : "Saved")
      );
      setErrorMsg("");

      setShowForm(false);
      fetchFollowup();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save follow-up");
      setSuccessMsg("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
     
{/* INITIAL FOLLOW-UP */}
{initialFollowUp && (
  <div className="mb-4 p-4 rounded-xl border border-emerald-200 bg-emerald-50">

    <h3 className="font-semibold text-emerald-700 mb-2">
      Initial Follow-Up Plan
    </h3>

    <div className="text-sm space-y-1">
      <p><strong>Date:</strong> {initialFollowUp.date || "N/A"}</p>
      <p><strong>In Person:</strong> {initialFollowUp.inPerson ? "Yes" : "No"}</p>
      <p><strong>Phone:</strong> {initialFollowUp.phone ? "Yes" : "No"}</p>
      <p><strong>PCP Phone:</strong> {initialFollowUp.pcpPhone ? "Yes" : "No"}</p>
      <p><strong>PCP Fax:</strong> {initialFollowUp.pcpFax ? "Yes" : "No"}</p>
      <p><strong>PCP Notified:</strong> {initialFollowUp.pcpNotifiedDate || "N/A"}</p>
    </div>

  </div>
)}


      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Follow-Up History
        </h2>

        <div className="flex gap-2">
          <Button
  variant="secondary"
  onClick={openAddForm}
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
    <path d="M12 5v14M5 12h14" />
  </svg>
  Add
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

  
      {showForm && (
        <div className="border p-4 mb-4 rounded bg-gray-50">
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />

          <input
            type="datetime-local"
            name="nextFollowupDate"
            value={formData.nextFollowupDate}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          >
            <option value="PENDING">
              PENDING
            </option>
            <option value="COMPLETED">
              COMPLETED
            </option>
          </select>

          <div className="flex gap-2">
            <Button variant="secondary"
              onClick={handleSubmit}
              disabled={saving}
            >
              {isEdit ? "Update" : "Save"}
            </Button>

            <Button
              variant="secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

   
      {loading && <p>Loading...</p>}

      {!loading && !followup && (
        <p>No follow-up recorded</p>
      )}
{followup && (
  <div className="border p-3 rounded mb-2 relative bg-gray-50 hover:shadow-sm transition">

    {/* EDIT ICON */}
 <button
  onClick={openEditForm}
  className="absolute top-2 right-2 p-2 rounded-full hover:bg-teal-400 transition"
  title="Edit follow-up"
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
</button>


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

    {followup.notes && (
      <p>
        <strong>Notes:</strong> {followup.notes}
      </p>
    )}
  </div>
)}

    </Card>
  );
}


