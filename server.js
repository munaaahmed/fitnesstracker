const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const view = require("./routes/view")
const api = require("./routes/api")
const PORT = process.env.PORT || 3000;

const Workout = require("./models");
const app = express();

app.use(logger("dev"));
app.use(view)
app.use(api)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", { useNewUrlParser: true });

app.post("/submit", ({ body }, res) => {
Workout.create(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.route('/api/workouts')
  .get(function (req, res) {
    Workout.find(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  })
  .post(function (req, res) {
    Workout.create(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  })
  .put(function (req, res) {
    res.send('Update the book')
  })

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});