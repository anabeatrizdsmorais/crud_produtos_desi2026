import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  // Estados controlados: cada campo do formulário tem seu próprio estado no React
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagemDeErro, setMensagemDeErro] = useState('')

  // useNavigate permite redirecionar o usuário para outra rota programaticamente
  const redirecionar = useNavigate()

  async function handleLogin() {
    try {
      // Envia email e senha para o backend
      // withCredentials: true → permite que o backend grave o cookie refreshToken no navegador
      const { data } = await axios.post(
        'http://localhost:8081/auth/login',
        { email, senha },
        { withCredentials: true }
      )

      // Salva o access token no localStorage para usar nas próximas requisições
      // ⚠ O refreshToken NÃO aparece aqui — ele foi salvo pelo backend em um cookie HttpOnly
      localStorage.setItem('accessToken', data.accessToken)

      // Redireciona para a página protegida
      redirecionar('/perfil')
    } catch {
      setMensagemDeErro('Credenciais inválidas')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* input controlado: o React é a fonte da verdade do valor digitado */}
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
        <button onClick={handleLogin}>Entrar</button>

        {/* Exibe a mensagem de erro apenas se existir */}
        {mensagemDeErro && <p style={{ color: 'red' }}>{mensagemDeErro}</p>}

        <small>Não tem conta? <Link to="/registrar">Criar conta</Link></small>
      </div>
    </div>
  )
}
