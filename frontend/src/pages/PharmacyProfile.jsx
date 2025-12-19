import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../components/ui/Button'; 
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

export default function PharmacyProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    registrationNumber: "",
    province: "",
    startDate: "",
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

    navigate("/dashboard"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl" shadow="lg">
        <Card.Header>
          <Card.Title>More About You</Card.Title>
          <Card.Description>
            Complete your  details
          </Card.Description>
        </Card.Header>

        <form onSubmit={handleSubmit}>
          <Card.Content className="space-y-6">
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
              placeholder="REG-12345"
              value={formData.registrationNumber}
              onChange={handleChange}
            />

            <Input
              label="Province"
              name="province"
              required
              placeholder="Ontario"
              value={formData.province}
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
          </Card.Content>

          <Card.Footer className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => navigate("/pharmacy")}
            >
              Back
            </Button>

            <Button type="submit" variant="primary" fullWidth>
              Finish Signup
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </div>
  );
}

