import express from 'express';
import cors from 'cors';
import prisma from "../prisma/client.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

export default app;