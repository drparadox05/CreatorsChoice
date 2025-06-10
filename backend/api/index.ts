import express from "express";
import serverless from "serverless-http";
import cors from 'cors';
// import userRouter from "../src/routers/user";  
// import workerRouter from "../src/routers/worker";

console.log("Creating Express app...");
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log("-------------------------");
  next();
});


app.get('/ping', (req, res) => {
  console.log("ping Route hit!");
  res.send('pong');
});


app.get("/", (req, res) => {
  console.log("Route hit!");
  res.send("Backend is running!");
});


// app.use("/v1/user", userRouter);
// app.use("/v1/worker", workerRouter);

console.log("App configured, exporting...");

if (process.env.NODE_ENV !== "production") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Local dev server running at http://localhost:${port}`);
  });
}

export default serverless(app);
