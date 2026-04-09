const express = require('express');
const cors = require('cors');
const routerUser = require('./router/usuario.js');
const routerLogin = require('./router/login.js');
const routerProduto = require('./router/produto.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routerUser);
app.use(routerLogin);
app.use(routerProduto);

module.exports = { app };