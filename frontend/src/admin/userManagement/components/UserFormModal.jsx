import { useState } from "react";
import {
    Edit2, Plus, X, Eye, EyeOff, AlertCircle,
    ChevronDown, Loader2, Shield, Mail, Lock, User,
} from "lucide-react";

const ROLE_OPTIONS = ["Admin", "Pharmacist"];
const STATUS_OPTIONS = ["Active", "Inactive"];
const EMPTY_FORM = { name: "", email: "", role: "Pharmacist", status: "Active", password: "" };

function validate(form, isEdit) {
    const errors = {};
    if (!form.name.trim())
        errors.name = "Full name is required.";
    else if (form.name.trim().length < 3)
        errors.name = "Name must be at least 3 characters.";
    if (!form.email.trim())
        errors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errors.email = "Enter a valid email address.";
    if (!isEdit) {
        if (!form.password)
            errors.password = "Password is required.";
        else if (form.password.length < 8)
            errors.password = "Password must be at least 8 characters.";
    }
    if (!form.role) errors.role = "Role is required.";
    return errors;
}

// ── Reusable input ───────────────────────────────────────────
function InputField({ label, name, type = "text", value, onChange, error, placeholder, icon: Icon, rightSlot }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon size={15} />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    placeholder={placeholder}
                    className={`w-full ${Icon ? "pl-9" : "pl-3.5"} ${rightSlot ? "pr-10" : "pr-3.5"} py-2.5
            rounded-lg border text-sm transition-colors outline-none
            ${error
                            ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                        }`}
                />
                {rightSlot && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={11} /> {error}
                </p>
            )}
        </div>
    );
}

// ── Reusable select ──────────────────────────────────────────
function SelectField({ label, name, value, onChange, options, error, icon: Icon }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon size={15} />
                    </div>
                )}
                <select
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    className={`w-full appearance-none ${Icon ? "pl-9" : "pl-3.5"} pr-9 py-2.5
            rounded-lg border text-sm transition-colors outline-none bg-white
            ${error
                            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                        }`}
                >
                    {options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                    ))}
                </select>
                <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
            </div>
            {error && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={11} /> {error}
                </p>
            )}
        </div>
    );
}

// ── Main Modal ───────────────────────────────────────────────
export default function UserFormModal({ editUser, onSave, onClose, loading }) {
    const isEdit = !!editUser;
    const [form, setForm] = useState(isEdit ? { ...editUser, password: "" } : EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);

    const handleChange = (field, val) => {
        setForm((prev) => ({ ...prev, [field]: val }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async () => {
        const errs = validate(form, isEdit);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        const ok = await onSave(form);
        if (ok) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                                {isEdit
                                    ? <Edit2 size={17} className="text-white" />
                                    : <Plus size={17} className="text-white" />
                                }
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-white">
                                    {isEdit ? "Edit User" : "Add New User"}
                                </h2>
                                <p className="text-xs text-emerald-100">
                                    {isEdit ? "Update user information" : "Create a new pharmacist account"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30
                flex items-center justify-center transition-colors"
                        >
                            <X size={16} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
                    <InputField
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="e.g. John Pharmacist"
                        icon={User}
                    />
                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="e.g. john@clinic.com"
                        icon={Mail}
                    />
                    {!isEdit && (
                        <InputField
                            label="Password"
                            name="password"
                            type={showPass ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                            placeholder="Min. 8 characters"
                            icon={Lock}
                            rightSlot={
                                <button
                                    type="button"
                                    onClick={() => setShowPass((p) => !p)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            }
                        />
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        <SelectField
                            label="Role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            options={ROLE_OPTIONS}
                            error={errors.role}
                            icon={Shield}
                        />
                        <SelectField
                            label="Status"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            options={STATUS_OPTIONS}
                            error={errors.status}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm
              font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 rounded-lg
              bg-gradient-to-r from-emerald-500 to-teal-500
              hover:from-emerald-600 hover:to-teal-600
              text-white text-sm font-semibold transition-all shadow-md
              disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 size={14} className="animate-spin" />}
                        {isEdit ? "Save Changes" : "Add User"}
                    </button>
                </div>
            </div>
        </div>
    );
}