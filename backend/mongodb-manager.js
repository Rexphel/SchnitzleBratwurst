var ObjectId = require('mongodb').ObjectId;
const {debug, isDateValid} = require("./helper");

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
    if (!isDateValid(date)) {
        throw "Date is in an invalid format! Use HH:MM-DD.MM.YYYY";
    }
    data = {
        "title": title,
        "message": message,
        "date": date,
        "duration": duration
    };
    debug("Event created!");
    return await collection.insertOne(data);
}

async function deleteEvent(collection, id) {
    if (id.length != 24) {
        throw "ID hast to be 24 characters long";
    }
    debug(`Event ${id} deleted`)
    return await collection.deleteOne({_id: new ObjectId(id)});
}

async function getEventCount(collection) {
    return (await getAllElements(collection)).length;
}

/*
  _____ __  __ _____   ____  _____ _______       _   _ _______   _ 
 |_   _|  \/  |  __ \ / __ \|  __ \__   __|/\   | \ | |__   __| | |
   | | | \  / | |__) | |  | | |__) | | |  /  \  |  \| |  | |    | |
   | | | |\/| |  ___/| |  | |  _  /  | | / /\ \ | . ` |  | |    | |
  _| |_| |  | | |    | |__| | | \ \  | |/ ____ \| |\  |  | |    |_|
 |_____|_|  |_|_|     \____/|_|  \_\ |_/_/    \_\_| \_|  |_|    (_)

This function updates EVERYTHING that is passed to update.
There is no check implemented to prevent any suspicious / unwanted things
to be added (not yet at least)

*/
async function updateEvent(collection, id, update) {
    if (id.length != 24) {
        throw "ID hast to be 24 characters long";
    }    
    let toUpdate = {};
    if (update.date) {
        if (!isDateValid(update.date)) {
            throw "Date is in an invalid format! Use HH:MM-DD.MM.YYYY";
        }
        // return await collection.updateOne({_id: new ObjectId(id)}, {$set: {date: update.date}});
    }    
    

    debug(`Event ${id} updated`);
    return await collection.updateOne({_id: new ObjectId(id)}, {$set: update});
    // if (update.title) {
    //     return await collection.updateOne({_id: new ObjectId(id)}, {$set: {title: update.title}});
    // }
    // if (update.message) {
    //     return await collection.updateOne({_id: new ObjectId(id)}, {$set: {message: update.message}});
    // }
    // if (update.duration) {
    //     return await collection.updateOne({_id: new ObjectId(id)}, {$set: {duration: update.duration}});
    // }
}

/*
  _____          _   _  _____ ______ _____  _ 
 |  __ \   /\   | \ | |/ ____|  ____|  __ \| |
 | |  | | /  \  |  \| | |  __| |__  | |__) | |
 | |  | |/ /\ \ | . ` | | |_ |  __| |  _  /| |
 | |__| / ____ \| |\  | |__| | |____| | \ \|_|
 |_____/_/    \_\_| \_|\_____|______|_|  \_(_)

 You (should) know why...
*/
async function drop(collection) {
    return await collection.drop();
}

module.exports = {getAllElements, addEvent, deleteEvent, updateEvent, getElementById, getEventCount, isElementInCollection, drop};