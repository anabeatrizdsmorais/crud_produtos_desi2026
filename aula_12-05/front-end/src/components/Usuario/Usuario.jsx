import axios from "axios";
import { useEffect, useState } from "react";

const Usuario = () => {

    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        busca: ""
    });

    // carregar usuários
    const carregarDados = async () => {

        try {
            setLoading(true);
            const response = await axios.get(
                "http://127.0.0.1:8081/"
            );
            setDados(response.data);

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setLoading(false);
        }

    };

    // buscar usuários
    const search = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.get(
                `http://127.0.0.1:8081/?busca=${form.busca}`
            );
            setDados(response.data);
        } catch (error) {
            console.error("Erro na busca:", error);
        } finally {
            setLoading(false);
        }

    };

    // limpar busca
    const limparBusca = () => {
        setForm({
            busca: ""
        });
        carregarDados();

    };

    useEffect(() => {
        carregarDados();
    }, []);

    return (
        <>

            <form onSubmit={search}>

                <input
                    type="text"
                    name="buscar"
                    id="buscar"
                    placeholder="Digite para buscar..."
                    value={form.busca}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            busca: e.target.value
                        })
                    }
                />

                <button type="submit">
                    Buscar
                </button>

                <button
                    type="button"
                    onClick={limparBusca}
                >
                    Limpar
                </button>

            </form>

            {
                loading ? (

                    <p>Carregando...</p>

                ) : (

                    <table border="1" cellPadding="10">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>CPF/CNPJ</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                dados.length > 0 ? (

                                    dados.map((usuario) => (

                                        <tr key={usuario.idusuario}>
                                            <td>{usuario.idusuario}</td>
                                            <td>{usuario.nome}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.cpf}</td>

                                            <td>
                                                <button>
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="5">
                                            Nenhum registro encontrado
                                        </td>
                                    </tr>

                                )
                            }

                        </tbody>

                    </table>

                )
            }

        </>
    );
};

export default Usuario;