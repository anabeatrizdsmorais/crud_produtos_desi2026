import { useState } from 'react'

import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import { IMaskInput } from 'react-imask';


function Cadastro() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCpf] = useState('')

    function cleanInputs() {
        setNome('')
        setEmail('')
        setSenha('')
        setCpf('')
    }

    const handleRegister = async(e) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:8081/', {
                nome: nome, 
                email: email,
                senha: senha,
                cpf: cpf
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

                <label htmlFor="password">CPF/CNPJ</label>
                {/* <input type="text" id="cpf_cnpj" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder='CPF/CNPJ' /> <br></br> */}

                <IMaskInput 
                mask="000.000.000-00"
                value={cpf}
                unmask={true} // true|false|'typed'
                onAccept={(value) => setCpf(value)}
                placeholder=''
                />

                <button type="submit">Salvar</button>
            </form>
            <ToastContainer />
        </>
    )
}

export default Cadastro