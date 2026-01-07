import { createContext, useContext, useState } from "react";

const AssessmentContext = createContext(null);

export const AssessmentProvider = ({ children }) => {
  const [ailmentId, setAilmentId] = useState(null);
  const [schema, setSchema] = useState(null);

  return (
    <AssessmentContext.Provider
      value={{ ailmentId, setAilmentId, schema, setSchema }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => useContext(AssessmentContext);