const express = require("express");
const mongoManager = require("./mongodb-manager");
const mongo = require("./mongodb-client");
const { debug_req, debug } = require('./helper.js');
const fs = require("fs");

const PORT = 8000;

const app = express();
const PREFIX = "/api";

app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get(`${PREFIX}`, (req, res) => {
  res.send("<h1>Hello, World from the API</h1>");
});

app.get(`${PREFIX}/events`, async (req, res) => {
    try {
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send({error: "Database not connected (yet)! Please retry in a few seconds."});
            return;
        }
        const result = await mongoManager.getAllElements(mongo.getCollection());
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({error: err});
    }
});

app.get(`${PREFIX}/events/:eventId`, async (req, res) => {
    try {
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send({error: "Database not connected (yet)! Please retry in a few seconds."});
            return;
        }
        const id = req.params.eventId;

        const inCollection = await mongoManager.isElementInCollection(mongo.getCollection(), id);
        if (!inCollection) {
            res.status(400).send({error: "This element does not exist!"});
            return;
        }

        const result = await mongoManager.getElementById(mongo.getCollection(), id);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({error: err});
    }
});

app.post(`${PREFIX}/events`, async (req, res) => {
    try {
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send({error: "Database not connected (yet)! Please retry in a few seconds."});
            return;
        }
        const query = req.body;
        if (!query || !query.title || !query.message || !query.date || !query.duration) {
            res.status(400).send({error: "Not all required parameters given! Unable to insert"});
            return;
        }
        const result = await mongoManager.addEvent(mongo.getCollection(), query.title, query.message, query.date, query.duration);
        const id = result.insertedId;
        // res.set("Location", `${PREFIX}/events/${id}`);
        res.status(201).send({id: id});
    } catch (err) {
        console.error(err);
        res.status(500).send({error: err});
    }
});


app.delete(`${PREFIX}/events/:eventId`, async (req, res) => {
    try {
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send({error: "Database not connected (yet)! Please retry in a few seconds."});
            return;
        }
        const id = req.params.eventId;
        const inCollection = await mongoManager.isElementInCollection(mongo.getCollection(), id);
        if (!inCollection) {
            res.status(400).send({error: "This element does not exist!"});
            return;
        }

        const result = await mongoManager.deleteEvent(mongo.getCollection(), id);
        if (!result.acknowledged) {
            res.status(500).send({error: "Could not delete!", done: false});
            return;
        }
        res.status(202).send({done: true});
    } catch (err) {
        console.error(err);
        res.status(500).send({error: err});
    }
});

app.delete(`${PREFIX}/allevents`, async (req, res) => {
    try {
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send({error: "Database not connected (yet)! Please retry in a few seconds."});
            return;
        }
        const result = await mongoManager.drop(mongo.getCollection());
        res.status(202).send({done: result});
    } catch (err) {
        console.error(err);
        res.status(500).send({error: err});
    }
});

app.put(`${PREFIX}/events/:eventId`, async (req, res) => {
    try {
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send({error: "Database not connected (yet)! Please retry in a few seconds."});
            return;
        }
        const query = req.body;
        const eventId = req.params.eventId;
        if (!query || (!query.title && !query.message && !query.date && !query.duration)) {
            res.status(400).send({error: "No parameter given! Unable to update"});
            return;
        }
        const result = await mongoManager.updateEvent(mongo.getCollection(), eventId, query);
        if (!result.acknowledged) {
            res.status(500).send({error: "Could not update!", done: false});
            return;
        }
        res.status(202).send({done: true});
        // res.status(201).end();
    } catch (err) {
        console.error(err);
        res.status(500).send({error: err});
    }
});

app.get(`${PREFIX}/eventcount`, async (req, res) => {
    try {
        debug_req(req);
        if (!mongo.isConnected()) {
            res.status(500).send({error: "Database not connected (yet)! Please retry in a few seconds."});
            return;
        }
        const result = await mongoManager.getEventCount(mongo.getCollection());
        res.send({count: result});
    } catch (err) {
        console.error(err);
        res.status(500).send({error: err});
    }
});

app.get(`${PREFIX}/version`, async (req, res) => {
    try {
        const package = fs.readFileSync('package.json');
        const packageParse = JSON.parse(package);
        const expressVersion = 'v' + packageParse.dependencies.express.slice(1);
        const mongoVersion = 'v' + packageParse.dependencies.mongodb.slice(1);
        const nodeVersion = process.version;
        res.status(200).send({express: expressVersion, mongo: mongoVersion, node: nodeVersion});
    } catch (err) {
        console.error(err);
        res.status(500).send({error: err});
    }
});

app.use((req, res, next) => {
    debug(`${req.method} request on ${req.originalUrl} but nothing found (404)!`);
    res.status(404).send({error: "Nothing found here...", errorCode: 404});
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  mongo.connect();
});

/* Template To Copy
    try {
        if (!mongo.isConnected()) {
            res.status(500).send({error: "Database not connected (yet)! Please retry in a few seconds."});
            return;
        }

    } catch (err) {
        console.error(err);
        res.status(500).send({error: err});
    }
*/
