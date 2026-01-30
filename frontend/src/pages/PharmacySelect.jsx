

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";
import { logoutUser } from "../utils/logout";

const ADD_PHARMACY_VALUE = "__ADD_PHARMACY__";

export default function PharmacySelect() {
  const navigate = useNavigate();

  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPharmacy, setSelectedPharmacy] = useState("");

  const hasFetched = useRef(false);

  /* 
     FETCH PHARMACY LIST
    */
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchPharmacies = async () => {
      try {
        setLoading(true);

        const res = await api.get("/pharmacies/list");

        // API-safe assignment
        setPharmacies(res.data?.data || res.data || []);
      } catch (error) {
        console.error(
          "Failed to fetch pharmacies:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  /* DROPDOWN OPTION*/
  const pharmacyOptions = [
    ...pharmacies.map((p) => ({
      label: p.name,
      value: String(p.id),
    })),
    {
      label: "+ Add Pharmacy",
      value: ADD_PHARMACY_VALUE,
    },
  ];

  /* HANDLE SELECT*/
  const handlePharmacyChange = (value) => {

    setSelectedPharmacy(value);
    if (value === ADD_PHARMACY_VALUE) {
      navigate("/pharmacy-profile", {
        state: { mode: "create" },
      });
      return;
    }

    setSelectedPharmacy(value);
  };

  const isAddPharmacySelected =
    selectedPharmacy === ADD_PHARMACY_VALUE;

  /*JOIN PHARMACY*/
  const handleNext = async () => {
    if (!selectedPharmacy) return;

    try {
      await api.post("/pharmacies/join", {
        pharmacyId: Number(selectedPharmacy),
      });

      navigate("/subscription");
    } catch (error) {
      console.error(
        "Join pharmacy failed:",
        error.response?.data || error.message
      );
      alert("User is already linked to a pharmacy.");
    }
  };

  /* UI*/
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-xl" shadow="lg">
        <Card.Header>
          <Card.Title>Select Your Pharmacy</Card.Title>
          <Card.Description>
            Choose a pharmacy from the list below
          </Card.Description>
        </Card.Header>

        <Card.Content className="space-y-6">
          <Select
            label="Pharmacy"
            value={selectedPharmacy}
            options={pharmacyOptions}
            placeholder={
              loading ? "Loading pharmacies..." : "Select pharmacy"
            }
            onChange={handlePharmacyChange}
            disabled={loading}
            required
          />
        </Card.Content>

        <Card.Footer className="flex gap-4">
          <Button variant="outline" fullWidth onClick={logoutUser}>
            Logout
          </Button>

          <Button
            variant="secondary"
            fullWidth
            disabled={!selectedPharmacy || isAddPharmacySelected}
            onClick={handleNext}
          >
            Next
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
