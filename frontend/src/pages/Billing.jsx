import { useState, useEffect } from "react";
import { CreditCard, Zap, Calendar, CheckCircle, AlertCircle, ExternalLink, Loader2, Clock } from "lucide-react";
import { authApi } from "../api/axios";
import { activateTrial, createCheckoutSession } from "../api/subscriptionApi";

// ── helpers ──────────────────────────────────────────────────────────────────

const daysLeft = (expiresOn) => {
  if (!expiresOn) return null;
  const diff = new Date(expiresOn) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric", month: "long", day: "numeric",
  });
};

// ── Status banner ─────────────────────────────────────────────────────────────

const StatusBanner = ({ plan, status, expiresOn }) => {
  if (!plan) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-sm">
        <AlertCircle size={18} className="flex-shrink-0" />
        No active subscription. Start a free trial or choose a plan below.
      </div>
    );
  }

  const remaining = daysLeft(expiresOn);
  const isExpired = status === "EXPIRED";
  const isTrialExpiring = plan === "TRIAL" && remaining !== null && remaining <= 3;

  if (isExpired) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm">
        <AlertCircle size={18} className="flex-shrink-0" />
        Your subscription has expired. Please renew to continue using RxPrescribe.
      </div>
    );
  }

  if (isTrialExpiring) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-sm">
        <Clock size={18} className="flex-shrink-0" />
        Your free trial expires in {remaining} day{remaining !== 1 ? "s" : ""}. Upgrade to keep access.
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm">
      <CheckCircle size={18} className="flex-shrink-0" />
      Your subscription is active
      {expiresOn ? ` — renews ${formatDate(expiresOn)}` : ""}.
    </div>
  );
};

// ── Plan card ─────────────────────────────────────────────────────────────────

const PlanCard = ({ name, price, period, features, highlight, badge, onSelect, loading, isCurrent }) => (
  <div className={`relative bg-white rounded-2xl border-2 p-6 flex flex-col
    ${highlight ? "border-emerald-500 shadow-lg shadow-emerald-100" : "border-gray-200 shadow-sm"}`}
  >
    {badge && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow">
          {badge}
        </span>
      </div>
    )}

    <div className="mb-4">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{name}</p>
      <div className="flex items-end gap-1 mt-1">
        <span className="text-3xl font-bold text-gray-900">{price}</span>
        {period && <span className="text-sm text-gray-500 mb-1">/{period}</span>}
      </div>
    </div>

    <ul className="space-y-2 flex-1 mb-6">
      {features.map((f) => (
        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
          {f}
        </li>
      ))}
    </ul>

    <button
      onClick={onSelect}
      disabled={loading || isCurrent}
      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all
        ${isCurrent
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : highlight
            ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md"
            : "border border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 text-gray-700"
        } disabled:opacity-60 flex items-center justify-center gap-2`}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {isCurrent ? "Current Plan" : `Choose ${name}`}
    </button>
  </div>
);

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Billing() {
  const [user, setUser] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    authApi.getCurrentUser()
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoadingPage(false));
  }, []);

  const sub = user?.subscription;
  const currentPlan = sub?.plan || null;
  const remaining = daysLeft(sub?.expiresOn);

  const handleTrial = async () => {
    setActionLoading("trial");
    try {
      await activateTrial();
      const updated = await authApi.getCurrentUser();
      setUser(updated);
      showToast("success", "Free trial activated — enjoy 7 days of full access!");
    } catch (err) {
      showToast("error", err?.response?.data?.message || "Failed to activate trial.");
    } finally {
      setActionLoading("");
    }
  };

  const handleUpgrade = async (plan) => {
    setActionLoading(plan);
    try {
      const res = await createCheckoutSession(plan);
      const url = res?.data?.checkoutUrl;
      if (url) {
        window.location.href = url;
      } else {
        showToast("error", "Could not start checkout. Please try again.");
      }
    } catch (err) {
      showToast("error", err?.response?.data?.message || "Checkout failed.");
    } finally {
      setActionLoading("");
    }
  };

  if (loadingPage) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5
          rounded-xl shadow-xl border text-sm font-medium
          ${toast.type === "success"
            ? "bg-white border-emerald-100 text-emerald-800"
            : "bg-white border-red-100 text-red-700"}`}
          style={{ animation: "slideUp 0.3s ease-out" }}
        >
          {toast.type === "success"
            ? <CheckCircle size={16} className="text-emerald-500" />
            : <AlertCircle size={16} className="text-red-500" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your plan, payments, and subscription details</p>
      </div>

      {/* Status banner */}
      <StatusBanner plan={currentPlan} status={sub?.status} expiresOn={sub?.expiresOn} />

      {/* Current plan summary card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CreditCard size={18} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">Current Subscription</h2>
            <p className="text-xs text-gray-400">Your active plan details</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Plan", value: currentPlan || "None" },
            { label: "Status", value: sub?.status || "—" },
            { label: "Expires", value: sub?.expiresOn ? formatDate(sub.expiresOn) : "—" },
            { label: "Days Remaining", value: remaining !== null ? `${remaining} days` : "—" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Free trial CTA — only shown when no plan */}
      {!currentPlan && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
              <Zap size={18} className="text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-800 mb-1">Start your free 7-day trial</h3>
              <p className="text-sm text-gray-500 mb-4">
                Full access to all features. No credit card required. Upgrade anytime.
              </p>
              <button
                onClick={handleTrial}
                disabled={actionLoading === "trial"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-gradient-to-r from-emerald-500 to-teal-500
                  hover:from-emerald-600 hover:to-teal-600
                  text-white text-sm font-semibold shadow-md
                  disabled:opacity-60 transition-all"
              >
                {actionLoading === "trial" && <Loader2 size={14} className="animate-spin" />}
                Activate Free Trial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plan cards */}
      <div>
        <h2 className="text-base font-semibold text-gray-700 mb-4">Choose a Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <PlanCard
            name="Monthly"
            price="$49"
            period="month"
            features={[
              "Unlimited assessments",
              "PDF generation",
              "Follow-up tracking",
              "Audit logs",
              "Email support",
            ]}
            isCurrent={currentPlan === "MONTHLY"}
            loading={actionLoading === "MONTHLY"}
            onSelect={() => handleUpgrade("MONTHLY")}
          />

          <PlanCard
            name="Annual"
            price="$399"
            period="year"
            badge="Best Value — Save 32%"
            highlight
            features={[
              "Everything in Monthly",
              "Priority support",
              "CSV bulk import",
              "Advanced reporting",
              "2 months free",
            ]}
            isCurrent={currentPlan === "ANNUAL"}
            loading={actionLoading === "ANNUAL"}
            onSelect={() => handleUpgrade("ANNUAL")}
          />
        </div>
      </div>

      {/* Invoice history placeholder */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Invoice History</h2>
          <Calendar size={16} className="text-gray-400" />
        </div>
        <div className="px-6 py-12 text-center text-gray-400">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <CreditCard size={20} className="text-gray-300" />
          </div>
          <p className="text-sm">No invoices yet</p>
          <p className="text-xs mt-1">Invoices will appear here after your first payment</p>
        </div>
      </div>

      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </div>
  );
}