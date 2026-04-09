const express = require('express');
const routerUser = express.Router();

const {createUser, editUser, getUsers, deleteUser} = require('../controller/usuarioController.js');

routerUser.post('/usuario', createUser); //criar usuario
routerUser.get('/usuario', getUsers); //listar usuarios
routerUser.patch('/usuario/:id', editUser); //editar usuario
routerUser.delete('/usuario/:id', deleteUser); //deletar usuario

module.exports = routerUser;