

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { logoutUser } from "../utils/logout";

export default function PharmacyProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    designation: "",
    firstName: "",
    lastName: "",
    registrationNumber: "",
    startDate: "",

    streetAddress: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* CREATE PHARMACY*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      logoutUser();
      return;
    }

    try {
      setLoading(true);

      await api.post(
  "/pharmacies",
  {
    designation: formData.designation,
    firstName: formData.firstName,
    lastName: formData.lastName,
    registrationNumber: formData.registrationNumber,
    startDate: formData.startDate,

    streetAddress: formData.streetAddress,
    city: formData.city,
    province: formData.province,
    country: formData.country,
    postalCode: formData.postalCode,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      // Go to subscription after successful creation
      navigate("/subscription");
    } catch (error) {
      console.error(
        "Create pharmacy failed:",
        error.response?.data || error.message
      );
      alert("User already linked to pharmacy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-3xl" shadow="lg">
        <Card.Header>
          <Card.Title>More About You</Card.Title>
          <Card.Description>
            Complete your personal and address details
          </Card.Description>
        </Card.Header>

        <form onSubmit={handleSubmit}>
          <Card.Content className="space-y-8">
            <Input
              label="Designation"
              name="designation"
              required
              value={formData.designation}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />

              <Input
                label="Last Name"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

         
            

            <Input
              label="Registration Number"
              name="registrationNumber"
              required
              value={formData.registrationNumber}
              onChange={handleChange}
            />

            <Input
              label="Start Date"
              type="date"
              name="startDate"
              required
              value={formData.startDate}
              onChange={handleChange}
            />

            {/* ADDRESS */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">
                Address Details
              </h3>

              <Input
                label="Street Address"
                name="streetAddress"
                required
                value={formData.streetAddress}
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Input
                  label="City"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                />

                <Input
                  label="Province / State"
                  name="province"
                  required
                  value={formData.province}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Input
                  label="Country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                />

                <Input
                  label="Postal Code"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Card.Content>

          {/* ACTIONS */}
          <Card.Content className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => navigate("/pharmacy-select")}
              >
                Back
              </Button>

              <Button
                type="submit"
                variant="secondary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                {loading ? "Creating..." : "Next"}
              </Button>
            </div>
          </Card.Content>

          <Card.Footer>
            <Button variant="outline" fullWidth onClick={logoutUser}>
              Logout
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </div>
  );
}

