import express from 'express';
import { createUsuario, getUsuarios, search, updateUsuario, deleteUsuario } from '../controller/usuarioController.js';

const routerUsuario = express.Router();

routerUsuario.get('/', getUsuarios);
routerUsuario.get('/busca', search);
routerUsuario.post('/', createUsuario);
routerUsuario.put('/:id', updateUsuario);
routerUsuario.delete('/:id', deleteUsuario);

export default routerUsuario;