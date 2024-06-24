const mongoose = require("mongoose");
const Listing = require("../models/listings.js");
const initData = require("./data.js");
const express = require("express");
const app = express();

app.set(express.urlencoded({extended: true}));

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({...obj, owner: '6673b8c89a9638ea6e6dbc35'}));
   await Listing.insertMany(initData.data);
    console.log("data was initialized successfully");
}

initDB();