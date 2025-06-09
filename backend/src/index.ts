import express from "express";
import userRouter from "./routers/user";  
import workerRouter from "./routers/worker";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log("-------------------------");
  next();
});

app.use("/v1/user", userRouter);
app.use("/v1/worker", workerRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
