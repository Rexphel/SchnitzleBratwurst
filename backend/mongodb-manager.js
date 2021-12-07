async function getAllElements(collection) {
    return await collection.find().toArray();
}

async function addEvent(collection, id, title, message, date) {
    data = {
        "id": id,
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