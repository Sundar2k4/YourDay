import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Show from "./Show";
import axios from "axios";

const Home = () => {
  const [Event, setEvent] = useState("");
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/add", {
        event: Event,
        date: Date,
        person: Name,
      });
      if (data.status === 200) {
        console.log("saved");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit} className="">
        <div className="flex flex-col px-2 py-2">
          <label htmlFor="event">Event:</label>
          <input
            type="text"
            id="event"
            value={Event}
            onChange={(e) => setEvent(e.target.value)}
          />

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white hover:cursor-pointer rounded-xl p-2"
        >
          Save
        </button>
      </form>
      <Show />
    </div>
  );
};

export default Home;
