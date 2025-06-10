import express from "express";
import serverless from "serverless-http";
import cors from 'cors';
// import userRouter from "../src/routers/user";  
// import workerRouter from "../src/routers/worker";

const app = express();
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   console.log("-------------------------");
//   next();
// });

app.get('/', (req, res) => {
  console.log("Route hit!");
  res.send('Backend is running!');
});

// app.use("/v1/user", userRouter);
// app.use("/v1/worker", workerRouter);

console.log("App configured, exporting...");
export default serverless(app);
