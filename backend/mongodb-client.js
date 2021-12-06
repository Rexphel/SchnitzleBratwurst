// const mongo = require("mongodb");
// const MongoClient = mongo.MongoClient;
const MongoClient = require("mongodb").MongoClient;

const dbName = "Schnitzel";
const mongoUri = `mongodb+srv://webeng:fwM9e7Q7PxneneR@cluster0.jldxk.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const collectionName = "Bratwurst";

let client;
let db, collection;

async function connect() {

    try {
        client = await MongoClient.connect(mongoUri, {useUnifiedTopology: true});
        console.log("Connected to Database");
        db = client.db(dbName);
        collection = db.collection(collectionName);
    } catch (err) {
        console.error(err);
        throw err;
    }

}

function disconnect() {
    db.close();
}

function isConnected() {
    return !!client && !!client.topology && client.topology.isConnected();
}

function getClient() { return client; }
function getDb() { return db; }
function getCollection() { return collection; }

module.exports = {connect, isConnected, disconnect, getClient, getDb, getCollection};