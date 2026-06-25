
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {

        const user = await prisma.user.findMany();
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}

export const createUser = async (req, res) => {
    try {

        const {nome, email, senha} = req.body; //o que vem da requisição

        const hash = await bcrypt.hash(senha, 10);
        
        const criarUser = await prisma.user.create({
            data: {
                name: nome,
                email: email,
                senha: hash
            },


        });

        return res.status(201).json({ success: true, message: "Usuário criado com sucesso", user: criarUser });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Erro interno no servidor", error: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            },
            select: { email: true, name: true }, //aparece somente email e nome e não aparece mais nada do que isso
        });

        if(user === null) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}

export const updateUser = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}