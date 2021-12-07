var ObjectId = require('mongodb').ObjectId;
const helper = require("./helper");

async function getAllElements(collection) {
    return await collection.find().toArray();
}

async function getElementById(collection, id) {
    if (id.length != 24) {
        throw "ID hast to be 24 characters long";
    }
    return await collection.find({_id: new ObjectId(id) }).toArray();
}

async function isElementInCollection(collection, id) {
    return (await getElementById(collection, id)).length > 0;
}

async function addEvent(collection, title, message, date, duration) {
    if (!helper.isDateValid(date)) {
        throw "Date is in an invalid format! Use HH:MM-DD.MM.YYYYx";
    }
    data = {
        "title": title,
        "message": message,
        "date": date,
        "duration": duration
    };
    return await collection.insertOne(data);
}

async function deleteEvent(collection, id) {
    return await collection.deleteOne({_id: new ObjectId(id)});
}

async function getEventCount(collection) {
    return (await getAllElements(collection)).length;
}

// TODO Only update the given parameters
async function updateEvent(collection, id, update) {
    if (update.title) {
        collection.updateOne({_id: new ObjectId(id)}, {$set: {title: update.title}});
    }
    if (update.message) {
        collection.updateOne({_id: new ObjectId(id)}, {$set: {message: update.message}});
    }
    if (update.date) {
        collection.updateOne({_id: new ObjectId(id)}, {$set: {date: update.date}});
    }    
    if (update.duration) {
        collection.updateOne({_id: new ObjectId(id)}, {$set: {duration: update.duration}});
    }
}

module.exports = {getAllElements, addEvent, deleteEvent, updateEvent, getElementById, getEventCount, isElementInCollection};