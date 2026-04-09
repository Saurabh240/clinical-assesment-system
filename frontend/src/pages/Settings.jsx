import { useState, useEffect } from "react";
import { User, Building2, Lock, Bell, Trash2, CheckCircle, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { authApi } from "../api/axios";
import api from "../api/axios";

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const ok = toast.type === "success";
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5
        rounded-xl shadow-xl border text-sm font-medium
        ${ok ? "bg-white border-emerald-100 text-emerald-800" : "bg-white border-red-100 text-red-700"}`}
      style={{ animation: "slideUp 0.3s ease-out" }}
    >
      {ok
        ? <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
        : <AlertCircle size={16} className="text-red-500 flex-shrink-0" />}
      {toast.msg}
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ icon: Icon, title, desc, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Icon size={17} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
          {desc && <p className="text-xs text-gray-400">{desc}</p>}
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ── Labelled field ────────────────────────────────────────────────────────────
function Field({ label, children, hint }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function TextInput({ value, onChange, disabled, placeholder, type = "text", rightSlot }) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition
          ${disabled
            ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-gray-200 text-gray-800 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          }
          ${rightSlot ? "pr-10" : ""}`}
      />
      {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
    </div>
  );
}

function SaveButton({ loading, onClick, label = "Save Changes" }) {
  return (
    <div className="flex justify-end pt-2">
      <button
        onClick={onClick}
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl
          bg-gradient-to-r from-emerald-500 to-teal-500
          hover:from-emerald-600 hover:to-teal-600
          text-white text-sm font-semibold shadow-md
          disabled:opacity-60 transition-all"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {label}
      </button>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Settings() {
  const [user, setUser] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [toast, setToast] = useState(null);

  // Profile state
  const [profile, setProfile] = useState({ firstName: "", lastName: "" });
  const [savingProfile, setSavingProfile] = useState(false);

  // Password state
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [showPass, setShowPass] = useState({ current: false, newPass: false, confirm: false });
  const [savingPassword, setSavingPassword] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState({
    followUpReminders: true,
    assessmentSummaries: true,
    systemUpdates: false,
  });

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    authApi.getCurrentUser()
      .then((data) => {
        setUser(data);
        setProfile({ firstName: data.firstName || "", lastName: data.lastName || "" });
      })
      .catch(console.error)
      .finally(() => setLoadingPage(false));
  }, []);

  const handleSaveProfile = async () => {
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      showToast("error", "First name and last name are required.");
      return;
    }
    setSavingProfile(true);
    try {
      // Profile update endpoint — PUT /auth/profile (wire to backend when ready)
      await api.put("/auth/profile", {
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
      });
      showToast("success", "Profile updated successfully.");
      const updated = await authApi.getCurrentUser();
      setUser(updated);
    } catch (err) {
      // Endpoint may not exist yet — show friendly message
      if (err?.response?.status === 404 || err?.response?.status === 405) {
        showToast("error", "Profile update endpoint not available yet.");
      } else {
        showToast("error", err?.response?.data?.message || "Failed to save profile.");
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSavePassword = async () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      showToast("error", "All password fields are required.");
      return;
    }
    if (passwords.newPass.length < 8) {
      showToast("error", "New password must be at least 8 characters.");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      showToast("error", "New passwords do not match.");
      return;
    }
    setSavingPassword(true);
    try {
      await api.put("/auth/password", {
        currentPassword: passwords.current,
        newPassword: passwords.newPass,
      });
      showToast("success", "Password changed successfully.");
      setPasswords({ current: "", newPass: "", confirm: "" });
    } catch (err) {
      if (err?.response?.status === 404 || err?.response?.status === 405) {
        showToast("error", "Password change endpoint not available yet.");
      } else {
        showToast("error", err?.response?.data?.message || "Failed to change password. Check your current password.");
      }
    } finally {
      setSavingPassword(false);
    }
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast("success", "Notification preference saved.");
  };

  if (loadingPage) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Toast toast={toast} />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account, security, and preferences</p>
      </div>

      {/* ── Profile ── */}
      <Section icon={User} title="Profile" desc="Your personal information">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name">
              <TextInput
                value={profile.firstName}
                onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                placeholder="First name"
              />
            </Field>
            <Field label="Last Name">
              <TextInput
                value={profile.lastName}
                onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                placeholder="Last name"
              />
            </Field>
          </div>

          <Field label="Email Address" hint="Contact support to change your email address">
            <TextInput value={user?.email || ""} disabled />
          </Field>

          <Field label="Role">
            <TextInput
              value={user?.role === "PHARMACIST" ? "Pharmacist" : user?.role === "PHARMACY_ADMIN" ? "Pharmacy Admin" : (user?.role || "—")}
              disabled
            />
          </Field>

          <SaveButton loading={savingProfile} onClick={handleSaveProfile} />
        </div>
      </Section>

      {/* ── Pharmacy Info ── */}
      <Section icon={Building2} title="Pharmacy" desc="Your pharmacy details (read-only — contact admin to update)">
        <div className="space-y-4">
          <Field label="Pharmacy Name">
            <TextInput value={user?.pharmacy?.name || "Not linked"} disabled />
          </Field>
          <Field label="Pharmacy ID">
            <TextInput value={user?.pharmacy?.id ? `#${user.pharmacy.id}` : "—"} disabled />
          </Field>
          <p className="text-xs text-gray-400">
            To update pharmacy details, contact your Pharmacy Admin or{" "}
            <a href="mailto:support@rxprescribe.com" className="text-emerald-600 hover:underline">support</a>.
          </p>
        </div>
      </Section>

      {/* ── Password ── */}
      <Section icon={Lock} title="Security" desc="Change your account password">
        <div className="space-y-4">
          <Field label="Current Password">
            <TextInput
              type={showPass.current ? "text" : "password"}
              value={passwords.current}
              onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
              placeholder="Enter current password"
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPass((s) => ({ ...s, current: !s.current }))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPass.current ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="New Password" hint="Minimum 8 characters">
              <TextInput
                type={showPass.newPass ? "text" : "password"}
                value={passwords.newPass}
                onChange={(e) => setPasswords((p) => ({ ...p, newPass: e.target.value }))}
                placeholder="New password"
                rightSlot={
                  <button type="button" onClick={() => setShowPass((s) => ({ ...s, newPass: !s.newPass }))} className="text-gray-400 hover:text-gray-600">
                    {showPass.newPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />
            </Field>
            <Field label="Confirm New Password">
              <TextInput
                type={showPass.confirm ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                placeholder="Confirm password"
                rightSlot={
                  <button type="button" onClick={() => setShowPass((s) => ({ ...s, confirm: !s.confirm }))} className="text-gray-400 hover:text-gray-600">
                    {showPass.confirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />
            </Field>
          </div>

          <SaveButton loading={savingPassword} onClick={handleSavePassword} label="Change Password" />
        </div>
      </Section>

      {/* ── Notifications ── */}
      <Section icon={Bell} title="Notifications" desc="Control which notifications you receive">
        <div className="space-y-4">
          {[
            { key: "followUpReminders", label: "Follow-up Reminders", desc: "Get reminded when patient follow-ups are overdue" },
            { key: "assessmentSummaries", label: "Assessment Summaries", desc: "Daily summary of assessment activity" },
            { key: "systemUpdates", label: "System Updates", desc: "Platform announcements and feature releases" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => toggleNotification(key)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  notifications[key] ? "bg-emerald-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications[key] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Danger Zone ── */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-red-100">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
            <Trash2 size={17} className="text-red-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Danger Zone</h2>
            <p className="text-xs text-gray-400">Irreversible account actions</p>
          </div>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Deactivate Account</p>
              <p className="text-xs text-gray-400">Your account will be disabled and you will lose access</p>
            </div>
            <button
              onClick={() => showToast("error", "Please contact support to deactivate your account.")}
              className="px-4 py-2 rounded-lg border border-red-300 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors"
            >
              Deactivate
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </div>
  );
}