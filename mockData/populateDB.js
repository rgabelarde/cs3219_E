const mongoose = require("mongoose")
const dotenv = require('dotenv').config()

let json = require('./photosData.json')
let PhotoModel = require('../models/photoModel')

let mongoDB = process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const populateDatabase = async () => {
    try {
        await PhotoModel.deleteMany();
        console.log("Database cleared successfully")
        await PhotoModel.insertMany(json.photos)
        console.log("Successful in populating of database")
    } catch (error) {
        console.log("Database population failed, error: ", error)
    }
}

populateDatabase().then(() => process.exit())