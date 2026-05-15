import express from 'express';
import { createAgendamento, getAgendamentos, search, updateAgendamento, deleteAgendamento } from '../controller/agendamentoController.js';

const routerAgendamento = express.Router();

routerAgendamento.get('/', getAgendamentos);
routerAgendamento.get('/search', search);
routerAgendamento.post('/', createAgendamento);
routerAgendamento.put('/:id', updateAgendamento);
routerAgendamento.delete('/:id', deleteAgendamento);

export default routerAgendamento;