import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../components/ui/Button'; 
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

export default function PharmacySelect() {
  const navigate = useNavigate();

  const [selectedPharmacy, setSelectedPharmacy] = useState("");
  const [showAddNew, setShowAddNew] = useState(false);

  const [newPharmacy, setNewPharmacy] = useState({
    name: "",
    address: "",
  });

  const pharmacies = [
    "Pharmacy 1",
    "Pharmacy 2",
    "Pharmacy 3",
    "Pharmacy 4",
    "Pharmacy 5",
  ];

  const handlePharmacyChange = (e) => {
    const value = e.target.value;
    setSelectedPharmacy(value);
    setShowAddNew(value === "add_new");
  };

  const handleNext = () => {
    if (!selectedPharmacy) return;

   
    navigate("/pharmacy-profile"); // next page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-xl" shadow="lg">
        <Card.Header>
          <Card.Title>Select Your Pharmacy</Card.Title>
          <Card.Description>
            Choose an existing pharmacy or add a new one
          </Card.Description>
        </Card.Header>

        <Card.Content className="space-y-6">
          {/* Pharmacy Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Pharmacy <span className="text-red-500">*</span>
            </label>

            <select
              value={selectedPharmacy}
              onChange={handlePharmacyChange}
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white
                         focus:outline-none focus:ring-1 focus:ring-teal-400"
              required
            >
              <option value="" disabled>
                Select pharmacy
              </option>

              {pharmacies.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}

              <option value="add_new">➕ Add New Pharmacy</option>
            </select>
          </div>

          {/* Add New Pharmacy Form */}
          {showAddNew && (
            <Card variant="filled" padding="md" className="border-dashed border-2">
              <h4 className="text-lg font-semibold mb-4">Add New Pharmacy</h4>

              <div className="space-y-4">
                <Input
                  label="Pharmacy Name"
                  placeholder="Enter pharmacy name"
                  required
                  value={newPharmacy.name}
                  onChange={(e) =>
                    setNewPharmacy({ ...newPharmacy, name: e.target.value })
                  }
                />

                <Input
                  label="Address"
                  placeholder="Street, City, Postal Code"
                  value={newPharmacy.address}
                  onChange={(e) =>
                    setNewPharmacy({
                      ...newPharmacy,
                      address: e.target.value,
                    })
                  }
                />
              </div>
            </Card>
          )}
        </Card.Content>

        <Card.Footer className="flex gap-4">
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate("/login")}
          >
            Logout
          </Button>

          <Button
            variant="primary"
            fullWidth
            disabled={!selectedPharmacy}
            onClick={handleNext}
          >
            Next
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
