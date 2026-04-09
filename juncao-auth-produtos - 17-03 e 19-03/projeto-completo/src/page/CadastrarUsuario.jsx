import React, { useState } from 'react';
import { cadastroUsuario } from '../services/usuario';

const CadastrarUsuario = () => {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
		tipo_usuario: 1
    });

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await cadastroUsuario(form);
			console.log("Usuário cadastrado com sucesso:", response);
		} catch (error) {
			console.error(error);
		}
	}

    return (
        <>
            <div className="container mt-4">
                <div className="card shadow">
                    
                    <div className="card-header bg-primary text-white">
                    Cadastro de Usuário
                    </div>

                    <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                        <label htmlFor="nome" className="form-label">
                            Nome
                        </label>
                        <input
                            id="nome"
                            type="text"
                            className="form-control"
                            placeholder="Seu nome completo"
                            value={form.nome}
                            onChange={(e) => setForm({ ...form, nome: e.target.value })}
                            required
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="nome@exemplo.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="senha" className="form-label">
                            Senha
                        </label>
                        <input
                            id="senha"
                            type="password"
                            className="form-control"
                            placeholder="********"
                            value={form.senha}
                            onChange={(e) => setForm({ ...form, senha: e.target.value })}
                            required
                            minLength={6}
                        />
                        <div className="form-text">Mínimo de 6 caracteres.</div>
                        </div>

                        <div className="mb-3">
                        <label htmlFor="tipo_usuario" className="form-label">
                            Tipo de usuário
                        </label>
                        <select
                            id="tipo_usuario"
                            className="form-select"
                            value={form.tipo_usuario}
                            onChange={(e) =>
                            setForm({ ...form, tipo_usuario: Number(e.target.value) })
                            }
                            required
                        >
                            <option value={1}>Usuário normal</option>
                            <option value={2}>Administrador</option>
                        </select>
                        </div>

                        <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-success">
                            Cadastrar Usuário
                        </button>

                        <button type="reset" className="btn btn-secondary">
                            Limpar
                        </button>
                        </div>

                    </form>
                    </div>

                </div>

                <div className="alert alert-info mt-3">
                    Dica: selecione <strong>Administrador</strong> apenas para usuários autorizados.
                </div>
            </div>
        </>
    )
}

export default CadastrarUsuario;