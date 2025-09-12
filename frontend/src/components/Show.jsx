import axios from "axios";
import React, { useState, useEffect } from "react";

const Show = () => {
  const [Event, setEvent] = useState([]);

  useEffect(() => {
    const fetchevents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getdata");
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchevents();
  }, []);

  return (
    <table cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Event</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {Event.map((eve) => (
          <tr key={eve._id}>
            <td>{eve.person}</td>
            <td>{eve.event}</td>
            <td>{new Date(eve.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Show;
