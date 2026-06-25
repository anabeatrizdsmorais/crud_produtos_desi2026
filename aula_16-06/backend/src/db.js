import mysql from 'mysql2/promise'

// Pool de conexões: reutiliza conexões abertas em vez de abrir uma nova a cada query
export const db = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'token_db',
})

// Cria as tabelas no banco se ainda não existirem (roda uma vez ao iniciar o servidor)
await db.query(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id    INT          AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS refresh_tokens (
    id         INT          AUTO_INCREMENT PRIMARY KEY,
    token      VARCHAR(512) NOT NULL UNIQUE,
    usuario_id INT          NOT NULL,
    expira_em  DATETIME     NOT NULL,
    criado_em  DATETIME     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
  )
`)
