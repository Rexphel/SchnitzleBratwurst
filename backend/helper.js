const regex = new RegExp("^\\d{1,2}:\\d{1,2}-\\d{1,2}.\\d{1,2}.\\d{4}$");

const DEBUG = true;

function isDateValid(date) {
    return regex.test(date);
}

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

module.exports = { isDateValid, debug, debug_req};