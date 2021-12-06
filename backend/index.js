const express = require("express");
const mongoManager = require("./mongodb-manager");
const mongo = require("./mongodb-client");
const PORT = 8000;

const app = express();
const PREFIX = "/api";

app.get(`${PREFIX}`, (req, res) => {
  res.send("<h1>Hello, World from the api</h1>");
});

app.get(`${PREFIX}/events`, async (req, res) => {
    try {
        if (!mongo.isConnected()) {
            res.status(500).send("Database not connected (yet)! Retry in a few seconds.");
            return;
        }
        console.log(req.query.name == null);
        const result = await mongoManager.getAllElements(mongo.getCollection());
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get(`${PREFIX}/events/:eventId`, async (req, res) => {
    try {
        if (!mongo.isConnected()) {
            res.status(500).send("Database not connected (yet)! Retry in a few seconds.");
            return;
        }
        const id = req.params.eventId;

        const result = await mongoManager.getElementById(mongo.getCollection(), id);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post(`${PREFIX}/events`, async (req, res) => {
    try {
        if (!mongo.isConnected()) {
            res.status(500).send("Database not connected (yet)! Retry in a few seconds.");
            return;
        }
        console.log(req.query);
        const query = req.query;
        // /api/events?title=TITLE&message=message&date=date&duration=duration
        if (!query.title || !query.message || !query.date || !query.duration) {
            res.status(400).send("Not all parameters given!");
            return;
        }
        const result = await mongoManager.addEvent(mongo.getCollection(), query.title, query.message, query.date, query.duration);
        const id = result.insertedId;
        console.log(`ID: ${id}`)
        res.set("Location", `${PREFIX}/events/${id}`);
        res.status(201).end();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  mongo.connect();
});
