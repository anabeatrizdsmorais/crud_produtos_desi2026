import jwt from 'jsonwebtoken';

// Middleware de autenticação: verifica se o access token é válido antes de liberar a rota
export function autenticar(req, res, next) {
  // O token chega no cabeçalho: Authorization: Bearer <token>
  // split(' ')[1] pega apenas a parte depois de "Bearer "
  const tokenRecebido = req.headers.authorization?.split(' ')[1]

  // Se não veio nenhum token, bloqueia com 401 (não autenticado)
  if (!tokenRecebido) {
    return res.status(401).json({ erro: 'Token não fornecido' })
  }

  try {
    // jwt.verify valida a assinatura E a expiração do token
    // Se válido, retorna o payload (os dados que foram assinados no login)
    const dadosDoUsuario = jwt.verify(tokenRecebido, process.env.ACCESS_SECRET)

    // Injeta os dados do usuário na requisição para as rotas seguintes usarem
    req.usuario = dadosDoUsuario

    // Chama o próximo handler (a rota protegida em si)
    next()
  } catch {
    // Token inválido ou expirado → bloqueia com 401
    return res.status(401).json({ erro: 'Token expirado ou inválido' })
  }
}
