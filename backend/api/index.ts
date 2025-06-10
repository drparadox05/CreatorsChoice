import express from "express";
import serverless from "serverless-http";
import cors from 'cors';
// import userRouter from "../src/routers/user";  
// import workerRouter from "../src/routers/worker";

console.log("Creating Express app...");
const app = express();
// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   console.log("-------------------------");
//   next();
// });


app.get('/ping', (req, res) => {
  console.log("ping Route hit!");
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});


app.get("/", (req, res) => {
  console.log("Route hit!");
  res.json({ message: "Backend is running!", timestamp: new Date().toISOString() });
});


if (process.env.VERCEL_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Local server running on http://localhost:${PORT}`);
  });
}

// app.use("/v1/user", userRouter);
// app.use("/v1/worker", workerRouter);

console.log("App configured, exporting...");
export default serverless(app);
