import { useState } from 'react'

import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import { IMaskInput } from 'react-imask';


function Cadastro() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCpf] = useState('')
    const [tipo, setTipo] = useState(0)
    const [documento, setDocumento] = useState(0)

    function cleanInputs() {
        setNome('')
        setEmail('')
        setSenha('')
        setCpf(''),
        setTipo(0)
    }

    const handleRegister = async(e) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:8081/', {
                nome: nome, 
                email: email,
                senha: senha,
                cpf: cpf,
                tipo: tipo
            })
            toast.success("Usuario cadastrado!")
            cleanInputs()
        } catch (error) {
            toast.error("Erro ao cadastrar usuário")
            console.error(error)
        }
    }

    return (
        <>
            <h1>Cadastro</h1>
            <form className="formulario" onSubmit={handleRegister}>
                <label htmlFor="text">Nome Completo</label>
                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Nome Completo' /> <br></br>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' /> <br></br>

                <label htmlFor="password">Senha:</label>
                <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder='Senha' /> <br></br>


               <label>Tipo (PF/PJ)</label>

            <select 
                name="tipo" 
                id="tipo"
                value={tipo}
                onChange={(e) => {
                    setTipo(e.target.value);
                    setDocumento(""); // limpa ao trocar
                }}
            >
                <option value="0">Pessoa Física</option>
                <option value="1">Pessoa Jurídica</option>
            </select>

            <br /><br />

            <label>
                {tipo === "0" ? "CPF" : "CNPJ"}
            </label>

            <IMaskInput
                mask={
                    tipo === "0"
                        ? "000.000.000-00"
                        : "00.000.000/0000-00"
                }
                value={documento}
                unmask={true}
                onAccept={(value) => setDocumento(value)}
                placeholder={
                    tipo === "0"
                        ? "Digite o CPF"
                        : "Digite o CNPJ"
                }
            />
                <button type="submit">Salvar</button>
            </form>
            <ToastContainer />
        </>
    )
}

export default Cadastro