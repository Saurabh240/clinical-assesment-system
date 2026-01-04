

/*import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";
import { logoutUser } from "../utils/logout";

export default function PharmacySelect() {
  const navigate = useNavigate();

  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPharmacy, setSelectedPharmacy] = useState("");

  //  prevents double call in React 18 dev
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; // stop second call
    hasFetched.current = true;

    const fetchPharmacies = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("accessToken");

        const res = await api.get("/pharmacies/list", {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
          withCredentials: true,
        });

        setPharmacies(res.data);
      } catch (error) {
        console.error("Failed to fetch pharmacies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  const pharmacyOptions = pharmacies.map((p) => ({
    label: p.name,
    value: p.id,
  }));

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
            placeholder={loading ? "Loading pharmacies..." : "Select pharmacy"}
            onChange={(value) => setSelectedPharmacy(value)}
            required
            disabled={loading}
          />
        </Card.Content>

        <Card.Footer className="flex gap-4">
         <Button variant="outline" fullWidth onClick={logoutUser}>
               Logout
            </Button>


          <Button
            variant="secondary"
            fullWidth
            disabled={!selectedPharmacy}
            onClick={() => navigate("/pharmacy-profile")}
          >
            Next
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
*/
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

  /* ----------------------------------
     FETCH PHARMACY LIST
  ---------------------------------- */
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchPharmacies = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("accessToken");

        const res = await api.get("/pharmacies/list", {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
          withCredentials: true,
        });

        // Safe assignment
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

  /* ----------------------------------
     DROPDOWN OPTIONS
  ---------------------------------- */
  const pharmacyOptions = [
    ...pharmacies.map((p) => ({
      label: p.name,
      value: String(p.id), // ensure string for Select
    })),
    {
      label: "+ Add Pharmacy",
      value: ADD_PHARMACY_VALUE,
    },
  ];

  /* ----------------------------------
     HANDLE SELECT CHANGE
  ---------------------------------- */
  const handlePharmacyChange = (value) => {
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

  /* ----------------------------------
     JOIN PHARMACY
  ---------------------------------- */
  const handleNext = async () => {
    if (!selectedPharmacy) return;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      logoutUser();
      return;
    }

    try {
      await api.post(
        "/pharmacies/join",
        {
          pharmacyId: Number(selectedPharmacy), // ✅ FIXED
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/subscription");
    } catch (error) {
      console.error(
        "Join pharmacy failed:",
        error.response?.data || error.message
      );
      alert("Unable to join pharmacy. Please try again.");
    }
  };

  /* ----------------------------------
     UI
  ---------------------------------- */
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
            disabled={
              !selectedPharmacy || isAddPharmacySelected
            }
            onClick={handleNext}
          >
            Next
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
