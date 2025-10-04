import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import Favorite from "./Favorite";

const Home = () => {
  const [Event, setEvent] = useState("");
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Today, setToday] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const gettoday = async () => {
      try {
        const response = await axios.get("http://localhost:5000/today-events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setToday(response.data);
        }
      } catch (err) {
        console.error("Error fetching today's events:", err);
      }
    };
    gettoday();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event: Event,
          date: Date,
          person: Name,
        }),
      });

      if (response.status === 200) {
        console.log("saved");
      } else {
        console.error("Save failed:", response.status);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="fixed w-full top-0 left-0 z-50">
        <Nav />
      </div>
      <div className="flex items-start justify-center min-h-screen bg-black px-8 py-16 space-x-16">
        <div className="flex flex-col max-w-md space-y-6 mr-16 mt-50">
          <div className="border border-black rounded-xl bg-yellow-200 bg-opacity-70 text-black p-8 shadow-lg">
            <p className="font-bold text-4xl">ABOUT:</p>
            <p>
              Welcome to Your Day!, a dedicated space designed to help you
              cherish and remember the important days of your loved ones.
            </p>
          </div>
          <div className="border border-black rounded-xl bg-yellow-200 bg-opacity-70 text-black p-8 shadow-lg">
            <h1 className="font-bold text-4xl">Todays Events:</h1>
            {Today.length > 0 ? (
              <ul>
                {Today.map((eve) => (
                  <li key={eve._id} className="text-xl">
                    {eve.person} - {eve.event}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events today</p>
            )}
          </div>
        </div>
        <form
          onSubmit={handlesubmit}
          className="border border-black rounded-xl bg-yellow-200 bg-opacity-70 text-black p-8 w-full max-w-md shadow-lg mt-50"
        >
          <div className="flex flex-col space-y-4">
            <p className="font-bold text-4xl">Enter the Info:</p>
            <label htmlFor="event" className="font-bold">
              Event:
            </label>
            <input
              type="text"
              id="event"
              value={Event}
              onChange={(e) => setEvent(e.target.value)}
              className="rounded p-2 border border-gray-400 focus:outline-none focus:border-black"
            />
            <label htmlFor="date" className="font-bold">
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={Date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded p-2 border border-gray-400 focus:outline-none focus:border-black"
            />
            <label htmlFor="name" className="font-bold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="rounded p-2 border border-gray-400 focus:outline-none focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-black text-yellow-200 hover:bg-yellow-300 hover:text-black rounded-xl p-2 font-bold transition hover:cursor-pointer"
            onClick={() => {
              navigate("/events");
            }}
          >
            Save
          </button>
        </form>
      </div>
      <Favorite />
    </div>
  );
};

export default Home;
