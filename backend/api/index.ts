import express from "express";
import serverless from "serverless-http";

const app = express();

app.get("/", (req, res) => {
  console.log("GET / route hit");
  res.send("Backend is running!");
});

export default serverless(app);
