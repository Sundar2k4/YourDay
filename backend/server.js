const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Event = require("./models/event.js");
const Log = require("./models/log.js");
const log = require("./models/log.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6000;

mongoose.connect(process.env.MONGOURI);


app.post("/add", async (req, res) => {
  try {
    const { event, date, person } = req.body;
    const newEvent = new Event({
      event,
      date: new Date(date), 
      person,
      user:req.user.id,
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

    const events = await Event.find({user:req.user.id});

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

app.post('/reg',async(req,res)=>{
  const {email,password} = req.body;
  try{
    const newlog = new log({
      email,
      password,
   })
   await newlog.save();
   res.status(200).json('Registered Successfully');
  }
  catch(err)
  {
    res.status(400).json(err);
  }
  

 
});


app.post("/log", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await log.findOne({ email });
    if (!user) return res.status(400).json("No user found");

    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) return res.status(400).json("Not Verified");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json("Server error");
  }
});




app.listen(PORT, () => {
  console.log("server connected on port " + PORT);
});
