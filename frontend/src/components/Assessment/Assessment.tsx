import React from "react";
import ReactMarkdown from "react-markdown";
import "./Assessment.css";

interface AssessmentProps {
  assessment?: string;
}

export const Assessment: React.FC<AssessmentProps> = ({ assessment }) => {
  return (
    <div className="assessment-container">
      <h2>Assessment</h2>
      <div className="assessment-content">
        {assessment ? (
          <ReactMarkdown>{assessment}</ReactMarkdown>
        ) : (
          <p className="placeholder-text">
            Vul het formulier in om je technische assessment te laten genereren.
          </p>
        )}
      </div>
    </div>
  );
};
