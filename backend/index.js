const express = require("express");

const PORT = 8000;

const app = express();
const PREFIX = "/api";

app.get(`${PREFIX}`, (req, res) => {
  res.send("<h1>Hello, World from the api</h1>");
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
