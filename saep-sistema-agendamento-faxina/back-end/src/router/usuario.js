import express from 'express';
import { createUsuario, getUsuarios, busca, updateUsuario, deleteUsuario } from '../controllers/agendamentoController.js';

const routerUsuario = express.Router();

routerUsuario.get('/', getUsuarios);
routerUsuario.get('/busca', busca);
routerUsuario.post('/', createUsuario);
routerUsuario.put('/:id', updateUsuario);
routerUsuario.delete('/:id', deleteUsuario);

export default routerUsuario;