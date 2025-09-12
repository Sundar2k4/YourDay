const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const home = require('./models/event.js');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT||6000;

mongoose.connect(process.env.MONGOURI);

app.post("/add",async(req,res)=>{
     try{
        const {event,date,person} = req.body;
         const homedata = new home({
            event,
            date:new Date(date),
            person,
         })

         const saved = await homedata.save();
         if(saved)
         {
            res.status(200).json(saved);
         }
     }catch(err)
     {
        res.status(400).json(err.response.data);
     }
})

app.get("/getdata",async(req,res)=>
{
   try{
      const val = await home.find();
      res.status(200).json(val);
   }
   catch(err)
   {
      res.status(400).json(err);
   }
   

})


app.listen(PORT,()=>{
    console.log("server connected");
})


