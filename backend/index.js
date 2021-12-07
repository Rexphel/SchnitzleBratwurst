const express = require("express");
const mongoManagjer = require("./mongodb-manager");
const mongo = require("./mongodb-client");

const PORT = 8000;

const app = express();
const PREFIX = "/api";

app.get(`${PREFIX}`, (req, res) => {
  res.send("<h1>Hello, World from the api</h1>");
});

app.get(`${PREFIX}/events`, async (req, res) => {
    try {
        const result = mongoManager.getAllElements(mongo.getCollection);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  mongo.connect();
});
