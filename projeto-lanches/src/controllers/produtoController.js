import db from '../config/db.js';

const getProdutos = async (req, res) => {
	try {
		const [resultado] = await db.query("SELECT id, nome, descricao, valor FROM produto where ativo = 1");

		if(resultado.length === 0) {
			return res.status(404).json({ message: "Nenhum produto encontrado" });
		}
		return res.status(200).json({ message: "Produtos encontrados", data: resultado });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao buscar produtos", error: error.message });
	}
};

export { getProdutos};