
/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { logoutUser } from "../utils/logout";

export default function PharmacyProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    designation: "",
    firstName: "",
    lastName: "",
    language: "",
    registrationNumber: "",
    startDate: "",

    // Address
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
    navigate("/subscribe");
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
            {/* BASIC INFO *
            <Input
              label="Designation"
              name="designation"
              placeholder="Pharmacist / Owner / Manager"
              required
              value={formData.designation}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                name="firstName"
                placeholder="John"
                required
                value={formData.firstName}
                onChange={handleChange}
              />

              <Input
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <Input
              label="Preferred Language"
              name="language"
              placeholder="English / French"
              required
              value={formData.language}
              onChange={handleChange}
            />

            <Input
              label="Registration Number"
              name="registrationNumber"
              placeholder="REG-123456"
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

            {/* ADDRESS SECTION *
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Address Details
              </h3>

              <Input
                label="Street Address"
                name="streetAddress"
                placeholder="123 Main Street, Apt 4B"
                required
                value={formData.streetAddress}
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Input
                  label="City"
                  name="city"
                  placeholder="Toronto"
                  required
                  value={formData.city}
                  onChange={handleChange}
                />

                <Input
                  label="Province / State"
                  name="province"
                  placeholder="Ontario"
                  required
                  value={formData.province}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Country"
                  name="country"
                  placeholder="Canada"
                  required
                  value={formData.country}
                  onChange={handleChange}
                />

                <Input
                  label="Postal / ZIP Code"
                  name="postalCode"
                  placeholder="M5V 3L9"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Card.Content>

          {/* ACTION BUTTONS *
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

              <Button type="submit" variant="secondary" fullWidth>
                Next
              </Button>
            </div>
          </Card.Content>

          <Card.Footer className="relative flex flex-col items-center gap-3">
            <span className="text-sm text-gray-500 bg-white px-2 -mt-3">
              Want to do this later?
            </span>

            {/*<Button type="button" variant="secondary" fullWidth>
              Logout
            </Button>*
            <Button variant="outline" fullWidth onClick={logoutUser}>
                 Logout
               </Button>

          </Card.Footer>
        </form>
      </Card>
    </div>
  );
}
*/

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
    language: "",
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

  /* ----------------------------------
     CREATE PHARMACY
  ---------------------------------- */
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
    language: formData.language,
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


      // ✅ Go to subscription after successful creation
      navigate("/subscription");
    } catch (error) {
      console.error(
        "Create pharmacy failed:",
        error.response?.data || error.message
      );
      alert("Unable to create pharmacy. Please try again.");
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
              label="Preferred Language"
              name="language"
              required
              value={formData.language}
              onChange={handleChange}
            />

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

