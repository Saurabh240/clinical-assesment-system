

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { logoutUser } from "../utils/logout";
import { activateTrial, createCheckoutSession } from "../api/subscriptionApi";

export default function Subscription() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("");

  // Plan definitions
  const plans = [
    {
      id: "trial",
      title: "Trial",
      price: "Free",
      duration: "7 Days",
      features: [
        "Basic Clinical Assessment",
        "Limited Reports",
        "Email Support",
      ],
      disabled: false, // user can select trial
    },
    {
      id: "monthly",
      title: "Monthly",
      price: "₹999",
      duration: "per month",
      features: [
        "Full Clinical Assessment",
        "Unlimited Reports",
        "Priority Support",
      ],
      highlight: true,
    },
    {
      id: "annual",
      title: "Annual",
      price: "₹9,999",
      duration: "per year",
      features: [
        "Full Clinical Assessment",
        "Unlimited Reports",
        "Priority Support",
        "2 Months Free",
      ],
    },
  ];

  // Handle subscription click
  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    try {
      if (selectedPlan === "trial") {
        // Activate free trial
        const res = await activateTrial();
        console.log("Trial activated:", res.data);

        // Navigate to dashboard after trial
        navigate("/dashboard");
        return;
      }

      // Paid plans
      const planMap = { monthly: "MONTHLY", annual: "ANNUAL" };
      const res = await createCheckoutSession(planMap[selectedPlan]);
      const { checkoutUrl } = res.data;

      if (checkoutUrl) {
        // Redirect to payment page
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      console.error("Subscription error:", err);
      alert("Subscription already exists.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-6xl">
        {/* Header */}
        <Card.Header className="text-center">
          <Card.Title>Select Your Subscription Plan</Card.Title>
          <Card.Description>
            Choose the plan that best fits your clinical needs.
          </Card.Description>
        </Card.Header>

        {/* Plans Grid */}
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`rounded-xl border p-6 flex flex-col justify-between transition-all
                    ${isSelected ? "border-teal-500 ring-2 ring-teal-300 bg-teal-50" : "border-gray-200 bg-white"}
                  `}
                >
                  <div>
                    {plan.highlight && (
                      <span className="inline-block mb-3 text-xs font-semibold text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}

                    <h3 className="text-xl font-semibold text-gray-900">{plan.title}</h3>

                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="ml-2 text-sm text-gray-500">{plan.duration}</span>
                    </div>

                    <ul className="mt-6 space-y-2 text-sm text-gray-600">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-teal-600 font-bold">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="mt-6"
                    fullWidth
                    variant={isSelected ? "secondary" : "outline"}
                    disabled={plan.disabled}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.disabled ? "Already Active" : "Choose Plan"}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Info Text */}
          <div className="mt-10 text-center text-sm text-gray-600 space-y-2">
            <p>
              Per-pharmacy subscriptions are managed by your Clinical Assessment
              Administrator.
            </p>
            <p>
              <a
                href="/pricing"
                className="text-teal-600 hover:underline font-medium"
              >
                View pricing details
              </a>
            </p>
          </div>
        </Card.Content>

        {/* Footer */}
        <Card.Footer>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              fullWidth
              variant="secondary"
              disabled={!selectedPlan}
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>

          <Button
  variant="outline"
  fullWidth
  onClick={logoutUser}
>
  Logout
</Button>

          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

