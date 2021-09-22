const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

app.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/json", (req, res) => {
  res.sendFile(path.join(__dirname, "data.json"));
});
app.get("/status/:statusCode", (req, res) => {
  const statusCode = req.params.statusCode;
  res.status(statusCode);
  res.send(`${statusCode}`);
});
app.get("/uuid", (req, res) => {
  let UUID = { data: uuidv4() };
  res.send(UUID);
});
app.get("/delay/:delayTime", (req, res) => {
  const delay = req.params.delayTime;
  setTimeout(() => {
    res.send(`response successful with the delay of ${delay}s`);
  }, delay * 1000);
});

app.listen(8080, () => {
  console.log("port 8080");
});
