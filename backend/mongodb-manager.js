var ObjectId = require('mongodb').ObjectId;

async function getAllElements(collection) {
    return await collection.find().toArray();
}

async function getElementById(collection, id) {
    return await collection.find({_id: new ObjectId(id) }).toArray();
}

async function addEvent(collection, title, message, date) {
    console.log("Date: ", date);
    data = {
        "title": title,
        "message": message,
        "date": date
    };
    return await collection.insertOne(data);
}

async function deleteEvent(collection, id) {
    // TODO
}

async function getIdFromTitle(collection, title) {
    // TODO
}

// TODO Only update the given parameters
async function updateEvent(collection, id, title, message, date) {
    // TODO
}

module.exports = {getAllElements, addEvent, deleteEvent, getIdFromTitle, updateEvent, getElementById};