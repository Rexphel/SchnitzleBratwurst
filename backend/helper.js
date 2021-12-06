const regex = new RegExp("^\\d{1,2}:\\d{1,2}-\\d{1,2}.\\d{1,2}.\\d{4}$");

function isDateValid(date) {
    return regex.test(date);
}

module.exports = { isDateValid };