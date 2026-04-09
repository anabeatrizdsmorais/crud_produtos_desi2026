import { api } from "./api";

export const cadastroUsuario = async (form) => {
    try {
        const response = await api.post('/usuario', form);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        throw error;
    }
}

export const listarUsuarios = async () => {
    const response = await api.get("/usuario");  
    if (response.status === 200) {  
        return response.data?.data ?? [];  
    }  
    return [];  
}

export const editarUsuario = async (id, form) => {}

export const excluirUsuario = async (id) => {}