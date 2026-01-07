import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Select from "../components/ui/Select";
import { useAssessment } from "../context/AssessmentContext";

const Dashboard = () => {
  const [ailments, setAilments] = useState([]);
  const navigate = useNavigate();
  const { setAilmentId, setSchema } = useAssessment();

  useEffect(() => {
    api.get("/ailments").then((res) => setAilments(res.data));
  }, []);

  const handleSelect = async (id) => {
    const res = await api.get(`/ailments/${id}`);

    setAilmentId(id);
    setSchema(res.data.sections); // schema stored
    navigate("/assessment");
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Select Ailment</h1>

      <Select
        placeholder="Choose ailment"
        options={ailments.map((a) => ({
          label: a.name,
          value: a.id,
        }))}
        onChange={(e) => handleSelect(e.target.value)}
      />
    </div>
  );
};

export default Dashboard;