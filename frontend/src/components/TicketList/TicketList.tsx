import React from "react";
import { Ticket, type TicketData } from "../Ticket/Ticket";
import "./TicketList.css";

interface TicketListProps {
  tickets: TicketData[];
}

export const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div className="ticket-list-container">
      <h2>Gegenereerde Tickets</h2>
      {!tickets || tickets.length === 0 ? (
        <p className="placeholder-text">
          Je tickets verschijnen hier zodra je assessment is gemaakt.
        </p>
      ) : (
        <div className="ticket-grid">
          {tickets.map((ticket, index) => (
            <Ticket
              key={`${ticket.ticket_type}-${ticket.number}-${index}`}
              ticket={ticket}
            />
          ))}
        </div>
      )}
    </div>
  );
};
