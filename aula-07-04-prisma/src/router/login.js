const express = require('express');
const routerLogin = express.Router();

const {login, esqueciSenha} = require('../controller/loginController.js');

routerLogin.post('/login', login);
routerLogin.post('/esqueci_senha', esqueciSenha);

module.exports = routerLogin;