import React from "react";
import "./IdeaBreakdownPage.css";
import { IdeaForm } from "../../components/IdeaForm/IdeaForm";

export const IdeaBreakdownPage: React.FC = () => {
  const handleSuccess = (data: any) => {
    console.log("Success:", data);
  };

  return (
    <div className="breakdown-page">
      <IdeaForm onSuccess={handleSuccess} />
    </div>
  );
};

export default IdeaBreakdownPage;
