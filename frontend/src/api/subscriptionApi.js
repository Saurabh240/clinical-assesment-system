import api from "./axios";

// Activate free trial
export const activateTrial = () => {
  return api.post("/api/subscriptions/trial");
};

// Create checkout session for paid plan
export const createCheckoutSession = (plan) => {
  return api.post("/api/billing/create-checkout-session", {
    plan,
  });
};

// Check subscription status
export const getSubscriptionStatus = () => {
  return api.get("/api/subscriptions/status");
};