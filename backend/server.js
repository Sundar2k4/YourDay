const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Event = require("./models/event.js");
const log = require("./models/log.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Fav = require("./models/fav.js");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGOURI);

const authenticate = async (req, res, next) => {
    try {
        const authheader = req.get('authorization');
        if (!authheader || !authheader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Authorization header missing or invalid" });
        }
        
        const token = authheader.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await log.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (err) {
        console.error('Authentication error:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        res.status(401).json({ error: 'Authentication failed' });
    }
}

app.post("/add", authenticate, async (req, res) => {
    try {
        const { event, date, person } = req.body;
        const newEvent = new Event({
            event,
            date: new Date(date),
            person,
            user: req.user._id, 
        });

        const saved = await newEvent.save();
        res.status(200).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get("/getdata", authenticate, async (req, res) => {
    try {

        const events = await Event.find({ user: req.user._id });
        res.status(200).json(events);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.post("/delete", authenticate, async (req, res) => {
    try {
        const { id } = req.body;
        

        const del = await Event.findOneAndDelete({ 
            _id: id, 
            user: req.user._id 
        });
        
        if (del) {
            res.status(200).json({ message: "Deleted successfully" });
        } else {
            res.status(404).json({ message: "Event not found or not authorized" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get("/today-events", authenticate, async (req, res) => {
    try {
        const today = new Date();
        const todayMonth = today.getMonth();
        const todayDay = today.getDate();

        const events = await Event.find({ user: req.user._id });

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

app.post('/reg', async (req, res) => {
    const { email, password } = req.body;
    try {

        const existingUser = await log.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newlog = new log({
            email,
            password, 
        });
        
        await newlog.save();
        res.status(201).json({ message: 'Registered Successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ error: err.message });
    }
});

app.post("/log", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await log.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "No user found" });
        }

        const isUser = await bcrypt.compare(password, user.password);
        if (!isUser) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/addfav', authenticate, async (req, res) => {
    try {
      const { name, items } = req.body;
  
      let person = await Fav.findOne({ name });
  
      if (person) {
        const updatedItems = Array.from(new Set([...person.items, ...items]));
        person.items = updatedItems;
        await person.save();
        res.status(200).send(person);
      } else {
        const newfav = new Fav({ name, items });
        await newfav.save();
        res.status(201).send(newfav);
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  

app.listen(PORT, () => {
    console.log("server connected on port " + PORT);
});