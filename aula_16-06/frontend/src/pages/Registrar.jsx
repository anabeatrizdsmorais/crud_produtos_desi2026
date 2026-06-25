import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Registrar() {
  // Estados controlados para cada campo do formulário
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagemDeErro, setMensagemDeErro]     = useState('')
  const [mensagemDeSucesso, setMensagemDeSucesso] = useState('')

  const redirecionar = useNavigate()

  async function handleRegistrar() {
    // Limpa mensagens anteriores a cada tentativa
    setMensagemDeErro('')
    setMensagemDeSucesso('')

    try {
      // Envia email e senha para o endpoint POST /auth/registrar
      await axios.post('http://localhost:8081/auth/registrar', { email, senha })

      // Informa o sucesso e redireciona para o login após 1.5 segundos
      setMensagemDeSucesso('Conta criada! Redirecionando para o login...')
      setTimeout(() => redirecionar('/login'), 1500)
    } catch (err) {
      // O backend retorna 409 quando o email já está cadastrado
      if (err.response?.status === 409) {
        setMensagemDeErro('Este email já está cadastrado')
      } else {
        setMensagemDeErro('Erro ao criar conta. Tente novamente.')
      }
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Criar conta</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <button onClick={handleRegistrar}>Criar conta</button>

        {/* Feedback visual de erro ou sucesso */}
        {mensagemDeErro    && <p style={{ color: 'red'   }}>{mensagemDeErro}</p>}
        {mensagemDeSucesso && <p style={{ color: 'green' }}>{mensagemDeSucesso}</p>}

        {/* Link para quem já tem conta */}
        <small>Já tem conta? <Link to="/login">Fazer login</Link></small>
      </div>
    </div>
  )
}
