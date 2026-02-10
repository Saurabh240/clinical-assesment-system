import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function AssessmentList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/assessments") // Assuming your backend has a list endpoint
      .then(res => setList(res.data))
      .catch(err => console.error("Could not fetch history", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading history...</div>;

  return (
    <div className="grid gap-4">
      {list.length === 0 ? (
        <Card className="text-center p-10 text-gray-500">No past assessments found.</Card>
      ) : (
        list.map((item) => (
          <Card key={item.id} className="hover:border-teal-300 transition-colors shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">{item.ailmentName || "Medical Assessment"}</h3>
                <p className="text-sm text-gray-500">Date: {new Date(item.createdAt).toLocaleDateString()}</p>
                <p className="text-xs text-gray-400">ID: {item.id}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(`/assessments/${item.id}`)}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}