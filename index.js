const express = require("express");

const PORT = 8000;

const app = express();

app.use( function (req, res, next) {
    res.send("<h1>Hello, World from Node.js</h1>");
});

app.listen(PORT, () => {console.log(`Listening on http://localhost:${PORT}`);});