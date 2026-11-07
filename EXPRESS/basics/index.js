const express = require("express");

const app = express();

app.get("/", (req, res) => res.end("HomePage"));

app.get("/contact-us", (req, res) => {
  return res.status(200).end("Email : xyz@gmail.com");
});

app.post("/tweet", (req, res) => {
  return res.status(201).end("Posted Succesfully!");
});

app.listen(8000, () => {
  console.log("Server is Running on PORT: 8000");
});
