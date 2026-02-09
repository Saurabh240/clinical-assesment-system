import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function AssessmentList() {
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res = await api.post("/assessments/getAllAssessments", {
        page: 0,
        size: 10,
        // add filters if needed
      });

      // IMPORTANT: Page response → data inside "content"
      setAssessments(res.data.content || []);
    } catch (err) {
      console.error("Failed to load assessments", err);
    }
  };

  return (
    <div className="p-6 grid gap-4">
      {assessments.map((a) => (
        <Card key={a.id}>
          <h3 className="font-semibold">
            {a.assessmentData?.patient?.firstName}{" "}
            {a.assessmentData?.patient?.lastName}
          </h3>

          <p>DOB: {a.assessmentData?.patient?.dob}</p>

          <Button onClick={() => navigate(`/assessments/${a.id}`)}>
            View Assessment
          </Button>
        </Card>
      ))}
    </div>
  );
}
