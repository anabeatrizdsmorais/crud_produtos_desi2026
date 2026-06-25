import axios from 'axios'

// Cria uma instância do axios já configurada para o nosso backend
// withCredentials: true → envia cookies automaticamente em todas as requisições
const clienteHttp = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true
})

// ─── Interceptor de respostas ─────────────────────────────────────────────────
// Intercepta TODA resposta antes de chegar ao componente React
// Caso a API retorne 401 (token expirado), tenta renovar o access token silenciosamente
clienteHttp.interceptors.response.use(
  // Respostas bem-sucedidas passam direto sem alteração
  (resposta) => resposta,

  // Respostas com erro entram aqui
  async (erro) => {
    // Guarda a configuração da requisição que falhou (URL, headers, body, etc.)
    const requisicaoOriginal = erro.config

    // Condição para tentar o refresh:
    // 1. O erro foi 401 (não autorizado / token expirado)
    // 2. Ainda não tentamos renovar para esta requisição (_retry evita loop infinito)
    if (erro.response?.status === 401 && !requisicaoOriginal._retry) {
      requisicaoOriginal._retry = true // marca para não tentar de novo

      try {
        // Chama /auth/refresh — o cookie refreshToken é enviado automaticamente pelo navegador
        const { data } = await axios.post(
          'http://localhost:8081/auth/refresh',
          {},
          { withCredentials: true }
        )

        // Salva o novo access token no localStorage
        localStorage.setItem('accessToken', data.accessToken)

        // Atualiza o cabeçalho da requisição original com o novo token
        requisicaoOriginal.headers.Authorization = `Bearer ${data.accessToken}`

        // Reenvia a requisição original agora com o token renovado
        return clienteHttp(requisicaoOriginal)
      } catch {
        // O refresh também falhou (token revogado ou expirado) → força novo login
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
      }
    }

    // Qualquer outro erro é repassado normalmente para o componente tratar
    return Promise.reject(erro)
  }
)

export default clienteHttp
