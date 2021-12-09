import {eventCount} from "../Home";

export async function setEventCount() {
    fetch("http://localhost:8000/api/eventcount")
        .then(res => res.json())
        .then(result => {
            console.dir(result);
        }).catch(err => console.error(err));
}