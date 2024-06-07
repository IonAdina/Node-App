// Import packages
const token = require("jsonwebtoken");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const uuid = require("uuid");
const clientRute = require("./rute/clientRute");
const motocicletaRute = require("./rute/motocicletaRute");
const inchiriereRute = require("./rute/inchiriereRute");
const fs = require("fs");

// Application
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(clientRute);
app.use(motocicletaRute);
app.use(inchiriereRute);

const maxAge = 3 * 24 * 3600 * 1000;
const jwt = (id) => {
  return token.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};
// Create
app.post("/login", (req, res) => {
  const { nume, CNP } = req.body;
  if (nume === "Andromeda" && CNP === "123") {
    const cookie = jwt(nume);
    res.cookie("jwt", cookie, { httpOnly: true, maxAge: maxAge });
    res.status(201).send(cookie);
  } else {
    res.status(404).send("mai incearca");
  }
});

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);

app.use(express.static("public"));
