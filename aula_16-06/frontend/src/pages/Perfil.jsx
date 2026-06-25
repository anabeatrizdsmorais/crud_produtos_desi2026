import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteHttp from '../services/api.js'

// Decoda o JWT sem biblioteca: pega a parte do meio (payload), converte de Base64 e parseia
// Estrutura do JWT: <header>.<payload>.<assinatura>
// O payload contém: { email, iat (issued at = emitido em), exp (expires at = expira em) }
function calcularSegundosAteExpirar(token) {
  try {
    const payloadBase64 = token.split('.')[1]                    // pega a parte do meio
    const payloadDecodificado = JSON.parse(atob(payloadBase64))  // Base64 → objeto JS
    const agora = Math.floor(Date.now() / 1000)                  // tempo atual em segundos Unix
    return Math.max(0, payloadDecodificado.exp - agora)          // quantos segundos faltam
  } catch {
    return 0
  }
}

export default function Perfil() {
  const [dadosDoUsuario, setDadosDoUsuario] = useState(null)
  const [segundosAteExpirar, setSegundosAteExpirar] = useState(0)
  const redirecionar = useNavigate()

  // Executa uma vez ao montar o componente: busca os dados do perfil na API
  useEffect(() => {
    const tokenAtual = localStorage.getItem('accessToken')

    // Inicia o contador com o tempo restante do token atual
    setSegundosAteExpirar(calcularSegundosAteExpirar(tokenAtual))

    // Chama a rota protegida enviando o token no cabeçalho Authorization
    clienteHttp.get('/api/perfil', {
      headers: { Authorization: `Bearer ${tokenAtual}` }
    })
      .then(({ data }) => setDadosDoUsuario(data.usuario))
      .catch(() => redirecionar('/login')) // se falhar, redireciona para o login
  }, [])

  // Contador regressivo: decrementa 1 segundo a cada tick do setInterval
  useEffect(() => {
    const temporizador = setInterval(() => {
      setSegundosAteExpirar(segundosAnteriores => Math.max(0, segundosAnteriores - 1))
    }, 1000)

    // Função de limpeza: cancela o intervalo quando o componente for desmontado
    return () => clearInterval(temporizador)
  }, [])

  async function handleLogout() {
    // Chama o backend para revogar o refresh token (remove do Set)
    await clienteHttp.post('/auth/logout')

    // Remove o access token do localStorage
    localStorage.removeItem('accessToken')

    redirecionar('/login')
  }

  // Define a cor do contador conforme o tempo restante
  const corDoContador = segundosAteExpirar > 5 ? 'green' : segundosAteExpirar > 0 ? 'orange' : 'red'

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Perfil</h2>

      {dadosDoUsuario
        ? <p>Logado como: <strong>{dadosDoUsuario.email}</strong></p>
        : <p>Carregando...</p>
      }

      {/* Contador visual de expiração do access token */}
      <div style={{
        margin: '1rem 0',
        padding: '1rem',
        border: `2px solid ${corDoContador}`,
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        <small>Access Token expira em:</small>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: corDoContador }}>
          {segundosAteExpirar > 0 ? `${segundosAteExpirar}s` : '⚠ EXPIRADO'}
        </div>
      </div>

      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
