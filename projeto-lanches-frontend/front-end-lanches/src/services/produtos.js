import {api} from "./api.js"

/**  
 * Busca lista de produtos no back-end.  
 * O back retorna: { message: string, data: Produto[] }  
 * Aqui devolvemos APENAS o array (data).  
 */  
export async function getProdutos() {  
    const response = await api.get("/produto");  
    if (response.status === 200) {  
        return response.data?.data ?? [];  
    }  
    return [];  
}  
  