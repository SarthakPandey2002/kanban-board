import React, { useState, useEffect } from "react";
import { fetchTickets } from "./apifetch";
import Column from "./Column";
import { Select, Button } from "antd";
import "antd/dist/reset.css";
import "./Board.css";

const { Option } = Select;

const KanbanBoard = () => {
  // Define KanbanBoard component
  const [tickets, setTickets] = useState([]);

  const useLocalStorage = (key, initialValue) => {
    const storedValue = localStorage.getItem(key) || initialValue;
    const [value, setValue] = useState(storedValue);

    useEffect(() => {
      localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
  };

  const [groupingOption, setGroupingOption] = useLocalStorage(
    "groupingOption",
    "status"
  );
  const [sortedBy, setSortedBy] = useLocalStorage("sortedBy", "priority");

  useEffect(() => {
    fetchTickets().then((data) => setTickets(data.tickets));
  }, []);

  useEffect(() => {
    localStorage.setItem("groupingOption", groupingOption);
  }, [groupingOption]);

  useEffect(() => {
    localStorage.setItem("sortedBy", sortedBy);
  }, [sortedBy]);

  const groupTicketsByOption = (tickets, option) => {
    const groupedTickets = {};

    tickets.forEach((ticket) => {
      // Loop through tickets
      const key =
        option === "status"
          ? ticket.status
          : option === "user"
          ? ticket.user
          : ticket.priority;
      if (!groupedTickets[key]) {
        groupedTickets[key] = [];
      }
      groupedTickets[key].push(ticket);
    });

    return groupedTickets;
  };

  const sortTicketsByOption = (groupedTickets, option) => {
    const sortedTickets = {};

    Object.keys(groupedTickets).forEach((groupTitle) => {
      const group = groupedTickets[groupTitle];
      sortedTickets[groupTitle] =
        option === "priority"
          ? group.sort((a, b) => b.priority - a.priority)
          : group.sort((a, b) => a.title.localeCompare(b.title));
    });

    return sortedTickets;
  };

  const groupedTickets = groupTicketsByOption(tickets, groupingOption);
  const sortedTickets = sortTicketsByOption(groupedTickets, sortedBy);

  return (
    <div className="kanban-board">
      <div className="options">
        <Select
          value={groupingOption}
          onChange={(value) => setGroupingOption(value)}
          style={{ width: 180, marginRight: 10 }}
        >
          <Option value="status">Group by Status</Option>
          <Option value="user">Group by User</Option>
          <Option value="priority">Group by Priority</Option>
        </Select>
        <Button onClick={() => setSortedBy("priority")} type="primary">
          Sort by Priority
        </Button>
        <Button onClick={() => setSortedBy("title")} type="primary">
          Sort by Title
        </Button>
      </div>
      <div className="board-columns">
        {Object.keys(sortedTickets).map((groupTitle) => (
          <Column
            key={groupTitle}
            title={groupTitle}
            tickets={sortedTickets[groupTitle]}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
