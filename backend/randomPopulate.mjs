import fetch from "node-fetch";

const titles = ["Test Event", "My Event", "Birthday", "Christmas", "Easter", "Winter", "Your Event"];
const descs = ["Hellio", "World", "I don't know what to write", "Do you hear me?", "Pls work"];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

for (let i = 0; i < 10; i++) {
    const title = titles[Math.floor(Math.random()*titles.length)];
    const desc = descs[Math.floor(Math.random() * descs.length)];

    const hour = getRndInteger(0, 23);
    const minute = getRndInteger(0, 59);
    const day = getRndInteger(1, 20);
    const month = getRndInteger(1, 12);
    const year = getRndInteger(1900, 2030);
    const dateTime = `${hour}:${minute}-${day}.${month}.${year}`;

    const durationHour = getRndInteger(0, 20);
    const durationMinute = getRndInteger(0, 50);
    const duration = `${durationHour}:${durationMinute}`;

    let data = {
        title: title,
        message: desc,
        date: dateTime,
        duration: duration
    }

    fetch("http://localhost:8000/api/events", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(res  => res.text())
    .then(txt => console.log(txt))
    .catch(err => console.error(err));

}