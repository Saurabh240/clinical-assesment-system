import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, FileText, Pill, Calendar } from "lucide-react";
import api from "../api/axios";

// AssessmentSummaryResponse returns patientFirstName/patientLastName as top-level fields
// getPatientName accepts the whole item object (not assessmentData)
const getPatientName = (item) => {
  const f = item.patientFirstName?.trim() || "";
  const l = item.patientLastName?.trim()  || "";
  return `${f} ${l}`.trim() || "Unknown";
};

// AssessmentSummaryResponse does not include patient contact details.
// Full details are available in the AssessmentResponse (single assessment GET).
// We populate what we can from the first assessment for this patient.
const getPatientDetails = (item) => {
  return {
    dob: null,
    gender: null,
    phone: null,
    healthCard: null,
    address: null,
    _note: "Full details available on individual assessment view",
  };
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

export default function PatientHistory() {
  const navigate = useNavigate();
  const [allAssessments, setAllAssessments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientTimeline, setPatientTimeline] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dropdownSearch, setDropdownSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.post("/assessments/getAllAssessments", {
          page: 0, size: 100, sortBy: "date", sortDirection: "DESC",
        });
        const content = res.data.content || [];

        // Build unique patient list
        const seen = new Map();
        content.forEach((item) => {
          const name = getPatientName(item);
          if (!seen.has(name)) {
            seen.set(name, {
              name,
              details: getPatientDetails(item),
              assessments: [],
            });
          }
          seen.get(name).assessments.push(item);
        });

        const patientList = Array.from(seen.values());
        setPatients(patientList);
        setAllAssessments(content);

        // Auto-select first patient
        if (patientList.length > 0) {
          selectPatient(patientList[0], content);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const selectPatient = (patient, allData) => {
    setSelectedPatient(patient);
    const name = patient.name;
    const source = allData || allAssessments;
    const timeline = source
      .filter((item) => getPatientName(item) === name)
      .map((item) => ({
        id: item.id,
        title: `${item.ailmentCode} Assessment`,
        date: item.createdAt,
        details: "",  // details not available in summary — visible in individual assessment view
        ailmentCode: item.ailmentCode,
        status: item.followupStatus,
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setPatientTimeline(timeline);
    setDropdownSearch("");
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(dropdownSearch.toLowerCase())
  );

  const filteredTimeline = search
    ? patientTimeline.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.details.toLowerCase().includes(search.toLowerCase()) ||
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

  const details = selectedPatient?.details || {};
  const age = getAge(details.dob);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patient History</h1>
        <p className="text-sm text-gray-500 mt-0.5">View comprehensive patient medical records and timeline</p>
      </div>

      {/* Top cards — patient selector + details + contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Select Patient */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Select Patient</p>
          <div className="relative">
            <button
              className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 hover:border-gray-300 transition"
              onClick={() => setDropdownSearch(dropdownSearch === null ? "" : (dropdownSearch === undefined ? "" : null))}
            >
              <span>{selectedPatient?.name || "Select a patient"}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Patient dropdown — always visible as a select for simplicity */}
            <select
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
              value={selectedPatient?.name || ""}
              onChange={(e) => {
                const p = patients.find((pt) => pt.name === e.target.value);
                if (p) selectPatient(p);
              }}
            >
              {patients.map((p) => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-400 mt-2">{patients.length} patients total</p>
        </div>

        {/* Patient Details */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Patient Details</p>
          {selectedPatient ? (
            <div className="space-y-2 text-sm">
              {details.healthCard && (
                <div>
                  <p className="text-xs text-gray-400">Medical Record Number</p>
                  <p className="font-semibold text-gray-800">{details.healthCard}</p>
                </div>
              )}
              <div className="flex gap-6">
                {age !== null && (
                  <div>
                    <p className="text-xs text-gray-400">Age</p>
                    <p className="font-semibold text-gray-800">{age}</p>
                  </div>
                )}
                {details.gender && (
                  <div>
                    <p className="text-xs text-gray-400">Gender</p>
                    <p className="font-semibold text-gray-800">{details.gender === "M" ? "Male" : details.gender === "F" ? "Female" : details.gender}</p>
                  </div>
                )}
                {details.dob && (
                  <div>
                    <p className="text-xs text-gray-400">DOB</p>
                    <p className="font-semibold text-gray-800">{details.dob}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No patient selected</p>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact Information</p>
          {selectedPatient ? (
            <div className="space-y-2 text-sm">
              {details.phone && (
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-semibold text-gray-800">{details.phone}</p>
                </div>
              )}
              {details.address && (
                <div>
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="font-semibold text-gray-800 text-xs leading-relaxed">{details.address}</p>
                </div>
              )}
              {!details.phone && !details.address && (
                <p className="text-sm text-gray-400">No contact info on record</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No patient selected</p>
          )}
        </div>
      </div>

      {/* Search history */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 transition"
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
          <div className="space-y-4">
            {filteredTimeline.map((entry) => (
              <button
                key={entry.id}
                onClick={() => navigate(`/assessments/${entry.id}`)}
                className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-left"
              >
                <TimelineIcon ailmentCode={entry.ailmentCode} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">{entry.title}</p>
                    <TimelineBadge ailmentCode={entry.ailmentCode} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {entry.date ? new Date(entry.date).toLocaleDateString("en-CA") : "—"}
                  </p>
                  {entry.details && (
                    <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">{entry.details}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}