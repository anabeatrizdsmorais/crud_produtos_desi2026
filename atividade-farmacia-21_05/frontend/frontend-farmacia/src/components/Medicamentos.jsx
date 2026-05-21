import { useEffect, useState } from "react";
import axios from "axios";

export default function Medicamentos() {

    const [medicamentos, setMedicamentos] = useState([]);

    const [form, setForm] = useState({
        nome: "",
        tipo: "",
        dosagem: "",
        marca: "",
        quantidade: "",
        estoque_minimo: ""
    });

    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    // LISTAR MEDICAMENTOS
    const carregarMedicamentos = async () => {

        try {

            const response = await axios.get(
                "http://localhost:3000/medicamentos"
            );

            setMedicamentos(response.data);

        } catch (error) {
            console.error(error);
            alert("Erro ao carregar medicamentos.");
        }
    };

    useEffect(() => {
        carregarMedicamentos();
    }, []);

    // ALTERA INPUTS
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // SALVAR
    const salvarMedicamento = async (e) => {

        e.preventDefault();

        try {

            // NOVO
            if (!editando) {

                const response = await axios.post(
                    "http://localhost:3000/medicamentos",
                    form
                );

                alert(response.data.message);

            } else {

                // EDITAR
                const response = await axios.put(
                    `http://localhost:3000/medicamentos/${idEditando}`,
                    form
                );

                alert(response.data.message);
            }

            // LIMPA FORM
            setForm({
                nome: "",
                tipo: "",
                dosagem: "",
                marca: "",
                quantidade: "",
                estoque_minimo: ""
            });

            setEditando(false);
            setIdEditando(null);

            carregarMedicamentos();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Erro ao salvar medicamento."
            );
        }
    };

    // EDITAR
    const editarMedicamento = (medicamento) => {

        setForm({
            nome: medicamento.nome,
            tipo: medicamento.tipo,
            dosagem: medicamento.dosagem,
            marca: medicamento.marca,
            quantidade: medicamento.quantidade,
            estoque_minimo: medicamento.estoque_minimo
        });

        setEditando(true);
        setIdEditando(medicamento.id);
    };

    return (
        <div
            style={{
                padding: "30px",
                fontFamily: "Arial"
            }}
        >

            <h1>
                Sistema de Medicamentos
            </h1>

            <form
                onSubmit={salvarMedicamento}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "400px",
                    marginBottom: "30px"
                }}
            >

                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="tipo"
                    placeholder="Tipo"
                    value={form.tipo}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="dosagem"
                    placeholder="Dosagem"
                    value={form.dosagem}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="marca"
                    placeholder="Marca"
                    value={form.marca}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="quantidade"
                    placeholder="Quantidade"
                    value={form.quantidade}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="estoque_minimo"
                    placeholder="Estoque mínimo"
                    value={form.estoque_minimo}
                    onChange={handleChange}
                />

                <button type="submit">

                    {
                        editando
                        ? "Atualizar Medicamento"
                        : "Cadastrar Medicamento"
                    }

                </button>

            </form>

            <table
                border="1"
                cellPadding="10"
                style={{
                    borderCollapse: "collapse",
                    width: "100%"
                }}
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Dosagem</th>
                        <th>Marca</th>
                        <th>Quantidade</th>
                        <th>Estoque Mínimo</th>
                        <th>Ações</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        medicamentos.map((medicamento) => (

                            <tr key={medicamento.id}>

                                <td>{medicamento.id}</td>
                                <td>{medicamento.nome}</td>
                                <td>{medicamento.tipo}</td>
                                <td>{medicamento.dosagem}</td>
                                <td>{medicamento.marca}</td>
                                <td>{medicamento.quantidade}</td>
                                <td>{medicamento.estoque_minimo}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            editarMedicamento(medicamento)
                                        }
                                    >
                                        Editar
                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}