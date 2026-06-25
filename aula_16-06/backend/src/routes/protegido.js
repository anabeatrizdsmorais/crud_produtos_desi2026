import { Router } from 'express'
import { autenticar } from '../middleware/autenticar.js'

const router = Router()

// GET /api/perfil
// O middleware `autenticar` é executado ANTES do handler principal
// Se o token for inválido ou expirado, a requisição para aqui e nunca chega ao handler
router.get('/perfil', autenticar, (req, res) => {
  // req.usuario foi preenchido pelo middleware com os dados extraídos do token
  res.json({ mensagem: 'Rota protegida acessada com sucesso!', usuario: req.usuario })
})

export default router
