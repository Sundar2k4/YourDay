import React from "react";
import { useState } from "react";
import axios from "react";

const [Event, setEvent] = useState("");
const [Name, setName] = useState("");
const [date, setDate] = useState("");
const handlesubmit = (e) => {
  e.preventDefault();
  const data = axios.post("https://localhost:5000/add");
  if (data.ok) {
    console.log("saved");
  }
};
const Home = () => {
  return (
    <>
      <div className="">
        <form action="" onSubmit={handlesubmit}>
          <label for="event">Event:</label>
          <input type="text" id="event" />
          <label for="date">Date:</label>
          <input type="date" id="date" />
          <label for="name">Name:</label>
          <input type="text" id="name" />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default Home;
