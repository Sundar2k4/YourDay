import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const Home = () => {
  const [Event, setEvent] = useState("");
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Today, setToday] = useState([]);

  useEffect(() => {
    const gettoday = async () => {
      try {
        const response = await axios.get("http://localhost:5000/today-events");
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
    <div className="bg-black">
      <div className="fixed w-full top-0 left-0 z-50">
        <Nav />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="border border-black rounded-xl bg-yellow-200 bg-opacity-70 text-black p-8 max-w-md shadow-lg mr-16">
          <p className="font-bold">ABOUT:</p>
          <p>
            Welcome to Your Day!, a dedicated space designed to help you cherish
            and remember the important days of your loved ones.
          </p>
        </div>
        <form
          onSubmit={handlesubmit}
          className="border border-black rounded-xl bg-yellow-200 bg-opacity-70 text-black p-8 w-full max-w-md shadow-lg"
        >
          <div className="flex flex-col space-y-4">
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
            className="mt-6 w-full bg-black text-yellow-200 hover:bg-yellow-300 hover:text-black rounded-xl p-2 font-bold transition"
          >
            Save
          </button>
        </form>
      </div>
      <div className="ml-69">
        <div className="border border-black rounded-xl bg-yellow-200 bg-opacity-70 text-black p-8 w-full max-w-md shadow-lg">
          {Today.length > 0 ? (
            <ul>
              {Today.map((eve) => (
                <li key={eve._id} className="font-5xl">
                  {eve.person} — {eve.event}
                </li>
              ))}
            </ul>
          ) : (
            <p>No events today</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
