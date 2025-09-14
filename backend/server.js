const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Event = require("./models/event.js");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6000;

mongoose.connect(process.env.MONGOURI);

// Add Event
app.post("/add", async (req, res) => {
  try {
    const { event, date, person } = req.body;
    const newEvent = new Event({
      event,
      date: new Date(date), 
      person,
    });

    const saved = await newEvent.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.get("/getdata", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const del = await Event.findByIdAndDelete(id);
    if (del) {
      res.status(200).json({ message: "Deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/today-events", async (req, res) => {
  try {
    const today = new Date();
    const todayMonth = today.getMonth(); 
    const todayDay = today.getDate();

    const events = await Event.find();

    const todaysEvents = events.filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === todayMonth && d.getDate() === todayDay;
    });

    if (todaysEvents.length === 0) {
      return res.status(404).json({ message: "No events today" });
    }

    res.json(todaysEvents);
  } catch (error) {
    console.error("Error fetching today's events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(PORT, () => {
  console.log("server connected on port " + PORT);
});
