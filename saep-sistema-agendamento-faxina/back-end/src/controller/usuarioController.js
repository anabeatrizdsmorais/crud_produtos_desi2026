import db from "../config/db.js";
import bcrypt from 'bcrypt';

export const getUsuarios = async (req, res) => {
    try{
        const {nome, email, telefone, tipo} = req.body;
        const [query] = db.query("SELECT * FROM usuario WHERE ativo = 1");

        if(query.length === 0){
            res.status(404).json({error: "Nenhum usuário encontrado"});
        }

        res.status(200).json({message: "Usuários encontrados", data: query});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const search = async (req, res) => {
    try {
        const {nome, email} = req.query;
        const [query] = db.query("SELECT * FROM usuario WHERE nome LIKE ? AND email LIKE ?", [`%${nome}%`, `%${email}%`]);

        if(query.length === 0){
            res.status(404).json({error: "Nenhum usuário encontrado"});
        }

        res.status(200).json({message: "Usuários encontrados", data: query});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const createUsuario = async (req, res) => {
    try {
        const {nome, email, telefone, tipo, senha} = req.body;
        
        if(!nome || !email || !senha){
            return res.status(400).json({error: "Todos os campos são obrigatórios", sucesso: false});
        }
        
        const hashedPassword = await bcrypt.hash(senha, 10);
        const [query] = db.query("INSERT INTO usuario (nome, email, telefone, tipo, senha, ativo) VALUES (?, ?, ?, ?, ?, ?)", [nome, email, telefone, tipo, hashedPassword, 1]);

        if(query.affectedRows === 0){
            res.status(500).json({error: "Erro ao criar usuário", sucesso: false});
        } 

        res.status(201).json({message: "Usuário criado com sucesso", sucesso: true});

    } catch (error) {
        res.status(500).json({error: error.message, sucesso: false});
    }
}

export const updateUsuario = async (req, res) => {
        try {} catch (error) {
            res.status(500).json({error: error.message});
        }
}

export const deleteUsuario = async (req, res) => {}

