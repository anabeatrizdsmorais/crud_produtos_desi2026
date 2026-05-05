import express from 'express';
import { createAgendamento, getAgendamentos, busca, updateAgendamento, deleteAgendamento } from '../controllers/agendamentoController.js';

const routerAgendamento = express.Router();

routerAgendamento.get('/', getAgendamentos);
routerAgendamento.get('/busca', busca);
routerAgendamento.post('/', createAgendamento);
routerAgendamento.put('/:id', updateAgendamento);
routerAgendamento.delete('/:id', deleteAgendamento);

export default routerAgendamento;