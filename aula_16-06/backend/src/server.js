// Carrega as variáveis de ambiente do arquivo .env (ACCESS_SECRET, REFRESH_SECRET, PORT)
import 'dotenv/config'
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Importa os grupos de rotas separados por responsabilidade
import rotasDeAutenticacao from './routes/auth.js';
import rotasProtegidas from './routes/protegido.js';

// Cria a aplicação Express
const app = express()

// Permite que o frontend (porta 5173) envie requisições com cookies (credentials: true)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// Habilita leitura do corpo das requisições no formato JSON
app.use(express.json())

// Habilita leitura dos cookies enviados pelo navegador (necessário para o refreshToken)
app.use(cookieParser())

// Registra as rotas públicas: /auth/login, /auth/refresh, /auth/logout
app.use('/auth', rotasDeAutenticacao)

// Registra as rotas protegidas: /api/perfil (exige token válido)
app.use('/api', rotasProtegidas)

const PORTA = process.env.PORT || 8081;

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`)
});
