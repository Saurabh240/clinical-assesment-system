import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, FileText, Pill, Calendar, Loader2 } from "lucide-react";
import api from "../api/axios";

// ── Helpers ───────────────────────────────────────────────────────────────────

// Summary response has patientFirstName/patientLastName at top level
const getPatientName = (item) => {
  const f = item.patientFirstName?.trim() || "";
  const l = item.patientLastName?.trim()  || "";
  return `${f} ${l}`.trim() || "Unknown";
};

const getAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
};

// ── Timeline helpers ──────────────────────────────────────────────────────────

const TimelineIcon = ({ ailmentCode }) => {
  const code = (ailmentCode || "").toLowerCase();
  if (code.includes("medication") || code.includes("med")) {
    return (
      <div className="w-9 h-9 rounded-full bg-green-100 border-2 border-white flex items-center justify-center flex-shrink-0">
        <Pill size={16} className="text-green-600" />
      </div>
    );
  }
  if (code.includes("follow") || code.includes("uti")) {
    return (
      <div className="w-9 h-9 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center flex-shrink-0">
        <Calendar size={16} className="text-purple-600" />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center flex-shrink-0">
      <FileText size={16} className="text-blue-600" />
    </div>
  );
};

const TimelineBadge = ({ ailmentCode }) => {
  const code = (ailmentCode || "").toLowerCase();
  if (code.includes("follow")) return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Follow-Up</span>;
  if (code.includes("med")) return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Medication</span>;
  return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Assessment</span>;
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PatientHistory() {
  const navigate = useNavigate();

  // All assessments (summary list)
  const [allAssessments, setAllAssessments] = useState([]);
  // Unique patient list built from the summary list
  const [patients, setPatients] = useState([]);
  // The selected patient object { name, assessmentIds[] }
  const [selectedPatient, setSelectedPatient] = useState(null);
  // Full patient details fetched from single-assessment GET
  const [patientDetails, setPatientDetails] = useState(null);
  // Timeline entries for the selected patient
  const [patientTimeline, setPatientTimeline] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // ── Fetch all summaries on mount ──────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.post("/assessments/getAllAssessments", {
          page: 0, size: 100, sortBy: "date", sortDirection: "DESC",
        });
        const content = res.data.content || [];
        setAllAssessments(content);

        // Build unique patient list
        const seen = new Map();
        content.forEach((item) => {
          const name = getPatientName(item);
          if (!seen.has(name)) {
            seen.set(name, { name, assessmentIds: [] });
          }
          seen.get(name).assessmentIds.push(item.id);
        });

        const list = Array.from(seen.values());
        setPatients(list);

        // Auto-select first patient
        if (list.length > 0) {
          handleSelectPatient(list[0], content);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Select a patient — build timeline + fetch full details ────────────────
  const handleSelectPatient = async (patient, source) => {
    setSelectedPatient(patient);
    setPatientDetails(null);
    setSearch("");

    const data = source || allAssessments;
    const name = patient.name;

    // Build timeline from summary data
    const timeline = data
      .filter((item) => getPatientName(item) === name)
      .map((item) => ({
        id: item.id,
        title: `${item.ailmentCode || "Assessment"}`,
        date: item.createdAt,
        ailmentCode: item.ailmentCode,
        status: item.followupStatus,
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setPatientTimeline(timeline);

    // Fetch full details from the most recent assessment for this patient
    if (patient.assessmentIds?.length > 0) {
      setDetailsLoading(true);
      try {
        // Use the first (most recent) assessment ID to get full patient data
        const firstId = timeline[0]?.id || patient.assessmentIds[0];
        const detailRes = await api.get(`/assessments/${firstId}`);
        const d = detailRes.data?.data?.patient || {};
        setPatientDetails({
          dob: d.dob || null,
          gender: d.gender || null,
          phone: d.phone || null,
          healthCard: d.healthCardNo || null,
          address: d.address || null,
          email: d.email || null,
        });
      } catch (err) {
        console.error("Failed to fetch patient details:", err);
        setPatientDetails({}); // empty but not null — stops loading state
      } finally {
        setDetailsLoading(false);
      }
    }
  };

  const handlePatientChange = (e) => {
    const p = patients.find((pt) => pt.name === e.target.value);
    if (p) handleSelectPatient(p);
  };

  const filteredTimeline = search
    ? patientTimeline.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.ailmentCode?.toLowerCase().includes(search.toLowerCase())
      )
    : patientTimeline;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  const age = getAge(patientDetails?.dob);
  const genderLabel = patientDetails?.gender === "M" ? "Male"
    : patientDetails?.gender === "F" ? "Female"
    : patientDetails?.gender || null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patient History</h1>
        <p className="text-sm text-gray-500 mt-0.5">View comprehensive patient medical records and timeline</p>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Select Patient */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Select Patient</p>
          <select
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800
              outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 transition bg-white"
            value={selectedPatient?.name || ""}
            onChange={handlePatientChange}
          >
            {patients.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-2">{patients.length} patients total</p>
        </div>

        {/* Patient Details */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Patient Details</p>
          {detailsLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Loader2 size={14} className="animate-spin" /> Loading...
            </div>
          ) : patientDetails ? (
            <div className="space-y-2.5 text-sm">
              {patientDetails.healthCard && (
                <div>
                  <p className="text-xs text-gray-400">Health Card</p>
                  <p className="font-semibold text-gray-800">{patientDetails.healthCard}</p>
                </div>
              )}
              <div className="flex gap-5">
                {age !== null && (
                  <div>
                    <p className="text-xs text-gray-400">Age</p>
                    <p className="font-semibold text-gray-800">{age}</p>
                  </div>
                )}
                {genderLabel && (
                  <div>
                    <p className="text-xs text-gray-400">Gender</p>
                    <p className="font-semibold text-gray-800">{genderLabel}</p>
                  </div>
                )}
                {patientDetails.dob && (
                  <div>
                    <p className="text-xs text-gray-400">DOB</p>
                    <p className="font-semibold text-gray-800">{patientDetails.dob}</p>
                  </div>
                )}
              </div>
              {!patientDetails.healthCard && !patientDetails.dob && !genderLabel && (
                <p className="text-xs text-gray-400">No details on record for this patient</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No patient selected</p>
          )}
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact Information</p>
          {detailsLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Loader2 size={14} className="animate-spin" /> Loading...
            </div>
          ) : patientDetails ? (
            <div className="space-y-2 text-sm">
              {patientDetails.phone && (
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-semibold text-gray-800">{patientDetails.phone}</p>
                </div>
              )}
              {patientDetails.email && (
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-semibold text-gray-800">{patientDetails.email}</p>
                </div>
              )}
              {patientDetails.address && (
                <div>
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="font-semibold text-gray-800 text-xs leading-relaxed">{patientDetails.address}</p>
                </div>
              )}
              {!patientDetails.phone && !patientDetails.email && !patientDetails.address && (
                <p className="text-sm text-gray-400">No contact info on record</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No patient selected</p>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none
              focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 transition"
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <Clock size={16} className="text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700">Medical History Timeline</h2>
        </div>

        {filteredTimeline.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            {search ? "No records match your search" : "No history found for this patient"}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTimeline.map((entry) => (
              <button
                key={entry.id}
                onClick={() => navigate(`/assessments/${entry.id}`)}
                className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-100
                  hover:border-gray-200 hover:shadow-sm transition-all text-left"
              >
                <TimelineIcon ailmentCode={entry.ailmentCode} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {entry.title} Assessment
                    </p>
                    <TimelineBadge ailmentCode={entry.ailmentCode} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {entry.date ? new Date(entry.date).toLocaleDateString("en-CA") : "—"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}