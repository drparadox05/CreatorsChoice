import express from "express";
import serverless from "serverless-http";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Lazy load routers only when needed
app.use("/v1/user", async (req, res, next) => {
  const { default: userRouter } = await import("../src/routers/user");
  userRouter(req, res, next);
});

app.use("/v1/worker", async (req, res, next) => {
  const { default: workerRouter } = await import("../src/routers/worker");
  workerRouter(req, res, next);
});

export default serverless(app);