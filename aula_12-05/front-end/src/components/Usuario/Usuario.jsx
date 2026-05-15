import axios from "axios";
import { useEffect, useState } from "react";

const Usuario = () => {

    const [dados, setDados] = useState([]);
    const carregarDados = async () => {
        try {
            const dados = await axios.get("http://127.0.0.1:8081/");
            const response = dados.data;
            // console.log(response.data);
            setDados(response.data);
        } catch (error) {
            console.error("Erro: ", error);
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    return (
        <>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>CPF/CNPJ</th>
                    <th>Ações</th>
                </thead>
                <tbody>

                    {
                        
                        dados.map((e, index) => (
                            <tr key={index}>
                                <td key={index}> {e.idusuario} </td>
                                <td key={index}> {e.nome} </td>
                                <td key={index}> {e.email} </td>
                                <td key={index}> {e.cpf} </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </>
    );
}

export default Usuario;