import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { db } from '../db.js'

const router = Router()

// ─── Funções auxiliares ───────────────────────────────────────────────────────

// Gera um par de tokens: access (curta duração) + refresh (longa duração)
function gerarParDeTokens(dadosDoUsuario) {
  // Access token: expira em 1m para demo, 15m em produção
  const accessToken  = jwt.sign(dadosDoUsuario, process.env.ACCESS_SECRET, { expiresIn: '1m' })

  // Refresh token: 7 dias, fica no cookie HttpOnly
  const refreshToken = jwt.sign(dadosDoUsuario, process.env.REFRESH_SECRET, { expiresIn: '7d' })

  return { accessToken, refreshToken }
}

// Retorna a data daqui a X dias (para salvar no banco como data de expiração)
function dataExpiracao(dias = 7) {
  const data = new Date()
  data.setDate(data.getDate() + dias)
  return data
}

// ─── POST /auth/registrar ─────────────────────────────────────────────────────
router.post('/registrar', async (req, res) => {
  const { email, senha } = req.body

  // Verifica se o email já existe no banco
  // db.query retorna [linhas, campos] — pegamos só as linhas com [0]
  const [linhas] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email])
  if (linhas.length > 0) {
    return res.status(409).json({ erro: 'Email já cadastrado' })
  }

  // Gera o hash da senha com bcrypt — nunca salvar senha em texto puro
  const senhaHash = await bcrypt.hash(senha, 10)

  // Insere o novo usuário no banco
  const [resultado] = await db.query(
    'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
    [email, senhaHash]
  )

  res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: resultado.insertId })
})

// ─── POST /auth/login ─────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, senha } = req.body

  // Busca o usuário pelo email
  const [linhas] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email])
  const usuario = linhas[0]

  // Erro genérico — não revela se o email existe ou não (segurança)
  if (!usuario) {
    return res.status(401).json({ erro: 'Credenciais inválidas' })
  }

  // bcrypt.compare compara a senha digitada com o hash salvo no banco
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
  if (!senhaCorreta) {
    return res.status(401).json({ erro: 'Credenciais inválidas' })
  }

  // Gera os dois tokens com id e email do usuário como payload
  const { accessToken, refreshToken } = gerarParDeTokens({ id: usuario.id, email: usuario.email })

  // Salva o refresh token no banco vinculado ao usuário
  await db.query(
    'INSERT INTO refresh_tokens (token, usuario_id, expira_em) VALUES (?, ?, ?)',
    [refreshToken, usuario.id, dataExpiracao(7)]
  )

  // Envia o refresh token em cookie HttpOnly (JavaScript não consegue ler)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,       // mudar para true em produção com HTTPS
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias em milissegundos
  })

  // Retorna apenas o access token no corpo
  res.json({ accessToken })
})

// ─── POST /auth/refresh ───────────────────────────────────────────────────────
router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(401).json({ erro: 'Sem refresh token' })
  }

  // Verifica se o token existe no banco (não foi revogado pelo logout)
  const [linhas] = await db.query(
    'SELECT * FROM refresh_tokens WHERE token = ?',
    [refreshToken]
  )
  const tokenNoBanco = linhas[0]

  if (!tokenNoBanco) {
    return res.status(403).json({ erro: 'Token revogado ou inválido' })
  }

  // Verifica se o token expirou pela data salva no banco
  if (new Date(tokenNoBanco.expira_em) < new Date()) {
    await db.query('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken])
    return res.status(403).json({ erro: 'Refresh token expirado' })
  }

  try {
    // Descarta iat e exp para não reutilizá-los no novo access token
    const { iat, exp, ...dadosDoUsuario } = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    const novoAccessToken = jwt.sign(dadosDoUsuario, process.env.ACCESS_SECRET, { expiresIn: '1m' })
    res.json({ accessToken: novoAccessToken })
  } catch {
    res.status(403).json({ erro: 'Refresh token expirado ou inválido' })
  }
})

// ─── POST /auth/logout ────────────────────────────────────────────────────────
router.post('/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  // Remove o refresh token do banco (revogação permanente)
  if (refreshToken) {
    await db.query('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken])
  }

  res.clearCookie('refreshToken')
  res.json({ mensagem: 'Logout realizado com sucesso' })
})

export default router
