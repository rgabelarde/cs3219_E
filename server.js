require("dotenv").config();

const express = require("express");
const axios = require("axios");
const redis = require("redis");
const mongoose = require("mongoose");
const timer = require('./timer');

mongoose.connect(process.env.DB_LOCAL_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

const app = express();
const port = process.env.PORT || 3000;

app.use(timer);

let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

async function fetchApiData() {
  const apiResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/photos`
  );
  console.log("Request sent to the API");
  return apiResponse.data;
}

async function getPhotosData(req, res) {
  const photos = 'cachedPhotos';
  let results;
  let isCached = false;

  try {
    const cacheResults = await redisClient.get(photos);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    } else {
      results = await fetchApiData();
      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set(photos, JSON.stringify(results));
    }

    res.send({
      fromCache: isCached,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}

app.get("/photos/get", getPhotosData);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});