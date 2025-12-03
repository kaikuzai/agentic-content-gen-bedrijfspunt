import React, { useState } from "react";
import "./IdeaBreakdownPage.css";
import { IdeaForm } from "../../components/IdeaForm/IdeaForm";
import { Assessment } from "../../components/Assessment/Assessment";
import { TicketList } from "../../components/TicketList/TicketList";
import type { TicketData } from "../../components/Ticket/Ticket";

interface BreakdownResult {
  assessment: string;
  tickets: TicketData[];
}

export const IdeaBreakdownPage: React.FC = () => {
  const [result, setResult] = useState<BreakdownResult | null>(null);

  const handleSuccess = (data: BreakdownResult) => {
    console.log("Page received data:", data);
    setResult(data);
  };

  return (
    <div className="breakdown-page">
      {!result && (
        <div className="info-bubble">
          <span className="info-icon">ℹ️</span>
          <p>
            Nadat we je idee hebben verwerkt kan je naar beneden scrollen om je
            tickets te zien!
          </p>
        </div>
      )}
      <div className="breakdown-content">
        <div className="form-section">
          <IdeaForm onSuccess={handleSuccess} />
        </div>
        <div className="assessment-section">
          <Assessment assessment={result?.assessment} />
        </div>
      </div>

      <div className="tickets-section">
        <TicketList tickets={result?.tickets || []} />
      </div>
    </div>
  );
};

export default IdeaBreakdownPage;
