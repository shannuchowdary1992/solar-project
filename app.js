const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors())

mongoose.connect('mongodb+srv://shanmukhamchowdary:pqP522VYEzZWFHGq@cluster0.orrajh6.mongodb.net/', {
    user: 'shanmukhamchowdary',
    pass: 'ynOf9mfznmdEvdXb',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err) {
    if (err) {
        console.log("error!! " + err)
    } else {
      //  console.log("MongoDB Connection Successful")
    }
})

var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});
var planetModel = mongoose.model('planets', dataSchema);

// Seed planets data
const planets = [
  { id: 1, name: "Mercury" },
  { id: 2, name: "Venus" },
  { id: 3, name: "Earth" },
  { id: 4, name: "Mars" },
  { id: 5, name: "Jupiter" },
  { id: 6, name: "Saturn" },
  { id: 7, name: "Uranus" },
  { id: 8, name: "Neptune" }
];

async function seedPlanets() {
  try {
    await planetModel.deleteMany({});  // Remove old data
    await planetModel.insertMany(planets);
    console.log("Planets seeded successfully!");
  } catch (err) {
    console.error("Error seeding planets:", err);
  }
}

// Call this once to seed data
// seedPlanets();

app.post('/planet', function(req, res) {
    planetModel.findOne({
        id: req.body.id
    }, function(err, planetData) {
        if (err) {
            res.status(500).send("Error in Planet Data");
        } else {
            res.send(planetData);
        }
    })
})

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/os', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
})

app.get('/live', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
})

app.get('/ready', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "ready"
    });
})

app.listen(3000, () => {
    console.log("Server successfully running on port - " +3000);
})

module.exports = app;
