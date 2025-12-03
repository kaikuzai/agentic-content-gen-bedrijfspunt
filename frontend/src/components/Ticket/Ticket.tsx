import React from "react";
import "./Ticket.css";

export interface TicketData {
  ticket_type: "frontend" | "backend" | "infra";
  number: number;
  title: string;
  description: string;
}

interface TicketProps {
  ticket: TicketData;
}

export const Ticket: React.FC<TicketProps> = ({ ticket }) => {
  return (
    <div className={`ticket-card ticket-type-${ticket.ticket_type}`}>
      <div className="ticket-header">
        <span className="ticket-id">
          {ticket.ticket_type.toUpperCase()}-{ticket.number}
        </span>
        <span className={`ticket-badge badge-${ticket.ticket_type}`}>
          {ticket.ticket_type}
        </span>
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <p className="ticket-description">{ticket.description}</p>
    </div>
  );
};
