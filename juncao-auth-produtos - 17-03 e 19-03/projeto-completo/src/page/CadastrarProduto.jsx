import React from 'react'

const CadastrarProduto = () => {
    return (
        <>
                <div className="container mt-4">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                        Cadastro de Produto
                        </div>

                        <div className="card-body">
                        <form>

                            {/* Nome */}
                            <div className="mb-3">
                            <label className="form-label">Nome do Produto</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Digite o nome do produto"
                            />
                            </div>

                            {/* Descrição */}
                            <div className="mb-3">
                            <label className="form-label">Descrição</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Digite a descrição do produto"
                            ></textarea>
                            </div>

                            {/* Valor */}
                            <div className="mb-3">
                            <label className="form-label">Valor</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                placeholder="0.00"
                            />
                            </div>

                            {/* Ativo */}
                            <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="ativo"
                            />
                            <label className="form-check-label" htmlFor="ativo">
                                Produto Ativo
                            </label>
                            </div>

                            {/* Botões */}
                            <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success">
                                Salvar Produto
                            </button>

                            <button type="reset" className="btn btn-secondary">
                                Limpar
                            </button>
                            </div>

                        </form>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default CadastrarProduto;