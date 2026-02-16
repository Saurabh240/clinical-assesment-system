import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { authApi } from "../api/axios";
import { activateTrial, createCheckoutSession } from "../api/subscriptionApi";

export default function Subscription() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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

  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    try {
      if (selectedPlan === "trial") {
        const res = await activateTrial();
        console.log("Trial activated:", res.data);
        navigate("/dashboard");
        return;
      }

      const planMap = { monthly: "MONTHLY", annual: "ANNUAL" };
      const res = await createCheckoutSession(planMap[selectedPlan]);
      const { checkoutUrl } = res.data;

      if (checkoutUrl) {
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
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`rounded-xl border p-6
                  ${isSelected
                    ? "border-teal-500 ring-2 ring-teal-300 bg-teal-50"
                    : "border-gray-200 bg-white"}
                  `}
                >
                  <h3 className="text-xl font-semibold">{plan.title}</h3>

                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {plan.duration}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-2 text-sm">
                    {plan.features.map((f, i) => (
                      <li key={i}>✓ {f}</li>
                    ))}
                  </ul>

                  <Button
                    className="mt-6"
                    fullWidth
                    variant={isSelected ? "secondary" : "outline"}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    Choose Plan
                  </Button>
                </div>
              );
            })}
          </div>
        </Card.Content>

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
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
