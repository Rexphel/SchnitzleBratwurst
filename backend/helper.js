const regex = new RegExp("^\\d{1,2}:\\d{1,2}-\\d{1,2}.\\d{1,2}.\\d{4}$");

function isDateValid(date) {
    return regex.test(date);
}

console.log(validateDate("13:11-01.12.2021"));

module.exports = { isDateValid };