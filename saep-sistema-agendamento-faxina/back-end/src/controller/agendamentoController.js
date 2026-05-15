import db from '../config/db.js';

export const getAgendamentos = async (req, res) => {
    
    try{
        const {datahora, id_cliente, id_servico, id_funcionario } = req.body;

        const [query] = await db.query(`SELECT * FROM agendamento WHERE ativo = 1`);
        if(query.length === 0){
            return res.status(404).json({success: false, message: 'Nenhum agendamento encontrado'});
        }
        
        return res.status(200).json(query);        
    } catch (error) {
        res.status(500).json({success: true, data: query});
    }

}

export const search = async (req, res) => {
    try{
        const {busca} = req.body;

        const [query] = await db.query(`SELECT * FROM agendamento WHERE '%${busca}%'`, [busca]);

        if(query.length === 0){
            return res.status(404).json({success: false, message: "Agendamento não encontrado"});
        }
        return res.status(200).json({success: true, data: query});

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const createAgendamento = async (req, res) => {
    try{
        const {datahora, id_cliente, id_servico, id_funcionario, observacao, logradouro, numero, bairro, complemento, cidade, estado, cep, status} = req.body;
        
        const [query] = await db.query(`INSERT INTO agendamento (datahora, id_cliente, id_servico, id_funcionario, observacao, logradouro, numero, bairro, complemento, cidade, estado, cep, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [datahora, id_cliente, id_servico, id_funcionario, observacao, logradouro, numero, bairro, complemento, cidade, estado, cep, status]);

        if(query.affectRows === 0){
            return res.status(404).json({success: true, message: 'Nenhum agendamento encontrado'});
        }

        return res.status(201).json({success: true, data: query});
        
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export const updateAgendamento = async (req, res) => {

    try{
        const {datahora, id_cliente, id_servico, id_funcionario, observacao, logradouro, numero, bairro, complemento, cidade, estado, cep, status} = req.body;
        
        const [query] = await db.query(`UPDATE agendamento SET datahora=?, id_cliente=?, id_funcionario=?,observacao=?, logradouro=?, numero=?, bairro=?, complemento=?, cidade=?, estado=?, cep=?, status=?`, [datahora, id_cliente, id_servico, id_funcionario, observacao, logradouro, numero, bairro, complemento, cidade, estado, cep, status]);

        if(query.affectRows === 0){
            return res.status(404).json({success: true, message: 'Nenhum agendamento encontrado'});
        }

        return res.status(200).json({success: true, data: query});
        
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export const deleteAgendamento = async (req, res) => {

}
