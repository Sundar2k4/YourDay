const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const home = require("./models/event.js");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6000;

mongoose.connect(process.env.MONGOURI);

app.post("/add", async (req, res) => {
  try {
    const { event, date, person } = req.body;
    const homedata = new home({
      event,
      date: new Date(date),
      person,
    });

    const saved = await homedata.save();
    if (saved) {
      res.status(200).json(saved);
    }
  } catch (err) {
    res.status(400).json(err.response?.data || err.message);
  }
});

app.get("/getdata", async (req, res) => {
  try {
    const val = await home.find();
    res.status(200).json(val);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const del = await home.findByIdAndDelete(id);
    if (del) {
      res.status(200).json({ message: "Deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("server connected");
});
