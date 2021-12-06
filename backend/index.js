const express = require("express");
const mongoManager = require("./mongodb-manager");
const mongo = require("./mongodb-client");
const PORT = 8000;

const app = express();
const PREFIX = "/api";

const DEBUG = true;

app.use(express.json());

app.get(`${PREFIX}`, (req, res) => {
  res.send("<h1>Hello, World from the api</h1>");
});

app.get(`${PREFIX}/events`, async (req, res) => {
    try {
        // debug(`GET request on ${req.originalUrl}`);
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send("Database not connected (yet)! Retry in a few seconds.");
            return;
        }
        const result = await mongoManager.getAllElements(mongo.getCollection());
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get(`${PREFIX}/events/:eventId`, async (req, res) => {
    try {
        // debug(`GET request on ${req.originalUrl}`);
        debug_req(req);
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
        // debug(`POST request on ${req.originalUrl}`);
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send("Database not connected (yet)! Retry in a few seconds.");
            return;
        }
        const query = req.body;
        if (!query || !query.title || !query.message || !query.date || !query.duration) {
            res.status(400).send("Not all parameters given! Unable to insert");
            return;
        }
        const result = await mongoManager.addEvent(mongo.getCollection(), query.title, query.message, query.date, query.duration);
        const id = result.insertedId;
        res.set("Location", `${PREFIX}/events/${id}`);
        res.status(201).end();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.put(`${PREFIX}/events`, async (req, res) => {
    try {
        // debug(`PUT request on ${req.originalUrl}`);
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send("Database not connected (yet)! Retry in a few seconds.");
            return;
        }
        const query = req.query;
        if (!query.title && !query.message && !query.date && !query.duration) {
            res.status(400).send("No parameter given! Unable to update");
            return;
        }
        res.status(201).end();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get(`${PREFIX}/eventcount`, async (req, res) => {
    try {
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send("Database not connected (yet)! Retry in a few seconds.");
            return;
        }
        const result = await mongoManager.getEventCount(mongo.getCollection());
        res.send({count: result});
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  mongo.connect();
});

function debug(msg) {
    if (DEBUG)
        console.log(msg);
}

function debug_req(req) {
    if (DEBUG) {
        console.log(`${req.method} request on ${req.originalUrl}.`);
        if (Object.keys(req.body) > 0) {
            console.log("Body:");
            console.dir(req.body);
        }
    }
}

/* Template To Copy
    try {
        if (!mongo.isConnected()) {
            res.status(500).send("Database not connected (yet)! Retry in a few seconds.");
            return;
        }

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
*/