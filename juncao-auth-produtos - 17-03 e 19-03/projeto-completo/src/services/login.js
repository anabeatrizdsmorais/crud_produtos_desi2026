import { api } from "./api";

export const login = async (form) => {
    
    try {
        const response = await api.post('/login', form );
        return response.data;
    } catch (error) {
        console.error("Ocorreu um erro! Mensagem: ", error?.response?.data || error.message);
    }
}

export const esqueciSenha = async (form) => {
    
}