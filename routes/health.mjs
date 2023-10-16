import express from "express";
const health = express.Router();

health.get("", (request, response, next) => {
  response.json("APP RUNNING");
});

export default health;
