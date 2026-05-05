import db from '../config/db.js';

const getAgendamentos = async (req, res) => {
    
    try{
        const {datahora, id_cliente, id_servico, id_funcionario, } = req.body;

    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

const busca = async (req, res) => {}

const createAgendamento = async (req, res) => {}

const updateAgendamento = async (req, res) => {}

const deleteAgendamento = async (req, res) => {}

export default {
    getAgendamentos,
    busca,
    createAgendamento,
    updateAgendamento,
    deleteAgendamento
}