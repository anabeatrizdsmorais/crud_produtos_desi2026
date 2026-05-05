import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routerUsuario from "./router/usuario.js";
import routerAgendamento from "./router/agendamento.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/usuario", routerUsuario);
app.use("/agendamento", routerAgendamento);

app.get("/", (req, res) => {
  res.send("TESTE API");
});

export default app;