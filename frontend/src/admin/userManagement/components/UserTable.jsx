import { Edit2, Trash2, Users, Shield } from "lucide-react";

const AVATAR_GRADS = [
    "from-emerald-400 to-teal-500",
    "from-teal-400 to-emerald-600",
    "from-green-400 to-emerald-500",
    "from-cyan-400 to-teal-600",
    "from-emerald-500 to-cyan-500",
];

function getInitials(name) {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function getGrad(id) {
    return AVATAR_GRADS[(id - 1) % AVATAR_GRADS.length];
}

// ── Empty State ──────────────────────────────────────────────
function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <Users size={28} className="text-emerald-400" />
            </div>
            <p className="text-sm font-semibold text-gray-600">No users found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters.</p>
        </div>
    );
}

// ── Main Table ───────────────────────────────────────────────
export default function UserTable({ users, onEdit, onDelete, onView }) {
    if (users.length === 0) return <EmptyState />;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            User
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hidden md:table-cell">
                            Role
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hidden sm:table-cell">
                            Status
                        </th>
                        <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hidden lg:table-cell">
                            Last Login
                        </th>
                        <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">

                            {/* ── User Info — name is a clickable hyperlink ── */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${getGrad(user.id)}
                      flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                                    >
                                        {getInitials(user.name)}
                                    </div>
                                    <div className="min-w-0">
                                        {/* NAME — hyperlink navigates to user detail page */}
                                        <button
                                            onClick={() => onView(user)}
                                            className="font-semibold text-emerald-600 hover:text-emerald-700
                        hover:underline underline-offset-2 transition-colors
                        truncate block text-left max-w-[140px] sm:max-w-none"
                                        >
                                            {user.name}
                                        </button>
                                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                    </div>
                                </div>
                            </td>

                            {/* ── Role ── */}
                            <td className="px-4 py-4 hidden md:table-cell">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                    text-[11px] font-semibold
                    ${user.role === "Admin"
                                            ? "bg-purple-50 text-purple-700"
                                            : "bg-teal-50 text-teal-700"
                                        }`}
                                >
                                    {user.role === "Admin" ? <Shield size={10} /> : <Users size={10} />}
                                    {user.role}
                                </span>
                            </td>

                            {/* ── Status ── */}
                            <td className="px-4 py-4 hidden sm:table-cell">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                    text-[11px] font-semibold
                    ${user.status === "Active"
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full
                      ${user.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`}
                                    />
                                    {user.status}
                                </span>
                            </td>

                            {/* ── Last Login ── */}
                            <td className="px-4 py-4 text-xs text-gray-400 hidden lg:table-cell whitespace-nowrap">
                                {user.lastLogin}
                            </td>

                            {/* ── Actions — always visible, Edit + Delete only ── */}
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    {/* Edit */}
                                    <button
                                        onClick={() => onEdit(user)}
                                        title="Edit user"
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                      text-teal-600 bg-teal-50 hover:bg-teal-100
                      text-xs font-semibold transition-colors"
                                    >
                                        <Edit2 size={13} />
                                        <span className="hidden sm:inline">Edit</span>
                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() => onDelete(user)}
                                        title="Delete user"
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                      text-red-500 bg-red-50 hover:bg-red-100
                      text-xs font-semibold transition-colors"
                                    >
                                        <Trash2 size={13} />
                                        <span className="hidden sm:inline">Delete</span>
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}