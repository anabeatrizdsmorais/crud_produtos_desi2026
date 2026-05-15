import database from "../config/database.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    const {nome, email, senha, cpf} = req.body;
    try {
        if(!nome ||  !email || !senha || !cpf){
            return res.status(400).json({message: "Todos os campos são obrigatórios."});
        }

        const salt = 10;
        const hashSenha = await bcrypt.hash(senha, salt)
        
        const [rows] =  await database.query("INSERT INTO usuario (nome, email, senha, cpf, ativo) VALUES (?, ?, ?, ?, ?)", [nome, email, hashSenha, cpf, 1])

        if(rows.affectedRows === 0){
            return res.status(400).json({message: "Erro ao cadastrar usuário"})
        }

        return res.status(201).json({message: "Usuário criado com sucesso"})
    } catch (error) {
        return res.status(500).json({message: "Erro ao cadastrar usuário.", error: error})
    }
}

export const getUsers = async (req, res) => {
    try {
       
        const [rows] =  await database.query("SELECT idusuario, nome, email, cpf FROM usuario WHERE ativo = 1");
        if(rows.length === 0){
            return res.status(400).json({message: "Erro ao mostrar usuários"})
        }
        return res.status(200).json({data: rows})
    } catch (error) {
        return res.status(500).json({message: "Erro ao cadastrar usuário.", error: error})
    }
}