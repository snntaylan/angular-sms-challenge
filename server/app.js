const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const smsRoutes = require("./routes/sms");
const Sms = require("./models/sms");
const app = express();

mongoose
  .connect("mongodb+srv://snntaylan:St26581989@sms-fs-challenge-3zgu2.mongodb.net/test")
  .then(async () => {
    console.log("Connected to database!");
    checkDb();
  })
  .catch((err) => {
    console.log("Connection failed!", err);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


checkDb = async () => {
  try {
    const smsCount = await Sms.count({});
    console.log("sms list count:", smsCount);

    if (smsCount === 0) {
      const json_data = require('./data/data.json');

      const smsList = json_data.map(sms => {
        const startDate = new Date(sms.start_date);
        const endDate = new Date(sms.end_date);
        return {
          ...sms,
          start_date: startDate < endDate ? startDate : endDate,
          end_date: startDate > endDate ? startDate : endDate,
        }
      })

      Sms.insertMany(smsList)
        .then(result => console.log("sms list created", result.length))
        .catch(err => console.log("lis not created:", err));
      console.log(json_data);
    }
  } catch (error) {
    console.error(error);
  }
}

app.use("/api/sms", smsRoutes);
console.log("end of app.js");

module.exports = app;