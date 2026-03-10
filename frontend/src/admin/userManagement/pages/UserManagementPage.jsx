import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

import useUserManagement from "../hooks/useUserManagement";
import UserTable from "../components/UserTable";
import UserFormModal from "../components/UserFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const ROLE_OPTIONS = ["Admin", "Pharmacist"];
const STATUS_OPTIONS = ["Active", "Inactive"];

// ── Toast ────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const isSuccess = toast.type === "success";
  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5
        rounded-xl shadow-xl border text-sm font-medium
        ${isSuccess
          ? "bg-white border-emerald-100 text-emerald-800"
          : "bg-white border-red-100 text-red-700"
        }`}
      style={{ animation: "slideUp 0.3s ease-out" }}
    >
      {isSuccess
        ? <CheckCircle size={17} className="text-emerald-500 flex-shrink-0" />
        : <AlertCircle size={17} className="text-red-500 flex-shrink-0" />
      }
      {toast.msg}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function UserManagementPage() {
  const navigate = useNavigate();
  const {
    users, loading, toast, showToast,
    addUser, updateUser, deleteUser,
  } = useUserManagement();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Filter logic ─────────────────────────────────────────
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  // ── Stats ─────────────────────────────────────────────────
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    inactive: users.filter((u) => u.status === "Inactive").length,
    admins: users.filter((u) => u.role === "Admin").length,
  };

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
  };

  const hasFilters = search || roleFilter !== "All" || statusFilter !== "All";

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      {/* Toast notification */}
      <Toast toast={toast} />

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage pharmacist and admin accounts</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl
            bg-gradient-to-r from-emerald-500 to-teal-500
            hover:from-emerald-600 hover:to-teal-600
            text-white text-sm font-semibold shadow-md hover:shadow-lg
            transition-all duration-200 self-start sm:self-auto"
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* ── Stats Strip ─────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Users", value: stats.total, badge: "bg-gray-100 text-gray-600" },
          { label: "Active", value: stats.active, badge: "bg-emerald-50 text-emerald-700" },
          { label: "Inactive", value: stats.inactive, badge: "bg-gray-100 text-gray-500" },
          { label: "Admins", value: stats.admins, badge: "bg-purple-50 text-purple-700" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 px-5 py-4 shadow-sm">
            <p className="text-xs text-gray-400 font-medium mb-1">{s.label}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>
                {s.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ──────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-4 border-b border-gray-100">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm
                focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-gray-400 flex-shrink-0" />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-3 pr-7 py-2 rounded-lg border border-gray-200 text-xs font-medium
                text-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100
                outline-none transition appearance-none bg-white cursor-pointer"
            >
              <option value="All">All Roles</option>
              {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-3 pr-7 py-2 rounded-lg border border-gray-200 text-xs font-medium
                text-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100
                outline-none transition appearance-none bg-white cursor-pointer"
            >
              <option value="All">All Status</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Clear filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                title="Clear filters"
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200
                  flex items-center justify-center transition-colors"
              >
                <RefreshCw size={13} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="px-6 py-2 bg-gray-50/60 border-b border-gray-100">
          <p className="text-xs text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-600">{filtered.length}</span>
            {" "}of{" "}
            <span className="font-semibold text-gray-600">{users.length}</span>
            {" "}users
          </p>
        </div>

        {/* Table */}
        <UserTable
          users={filtered}
          onEdit={(u) => setEditUser(u)}
          onDelete={(u) => setDeleteTarget(u)}
          onView={(u) => {
            // TODO: uncomment when user detail page is ready
            // navigate(`/admin/users/${u.id}`);
            showToast("success", `Viewing profile: ${u.name}`);
          }}
        />
      </div>

      {/* ── Add / Edit Modal ────────────────────────────── */}
      {(showAddModal || editUser) && (
        <UserFormModal
          editUser={editUser}
          loading={loading}
          onSave={editUser
            ? (data) => updateUser(editUser.id, data)
            : addUser
          }
          onClose={() => { setShowAddModal(false); setEditUser(null); }}
        />
      )}

      {/* ── Delete Confirmation Modal ────────────────────── */}
      {deleteTarget && (
        <DeleteConfirmModal
          user={deleteTarget}
          loading={loading}
          onConfirm={async () => {
            await deleteUser(deleteTarget.id);
            setDeleteTarget(null);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}