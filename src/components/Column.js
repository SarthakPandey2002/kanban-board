import React from "react";
import Ticket from "./Ticket";
import "./Column.css";

const Column = ({ title, tickets }) => {
  return (
    <div className="boardColumn">
      <h2>{title}</h2>
      {tickets.length > 0 ? (
        tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} />)
      ) : (
        <p>No tickets in this column</p>
      )}
    </div>
  );
};

export default Column;
