import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(express.json());
app.use(cors())

app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

export default app;