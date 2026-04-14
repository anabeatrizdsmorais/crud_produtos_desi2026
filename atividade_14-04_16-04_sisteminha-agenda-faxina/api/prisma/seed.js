import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function run() {
  console.log("Inserindo usuários...");

  const senhaHash = await bcrypt.hash('123456', 10);

  await prisma.usuario.createMany({
    data: [
      {
        nome: "Admin",
        email: "admin@email.com",
        senha: senhaHash,
        cpf: "22222222222"
      },
      {
        nome: "Teste",
        email: "teste@email.com",
        senha: senhaHash,
        cpf: "11111111111"
      }
    ],
    skipDuplicates: true
  });

  console.log("Usuários inseridos com sucesso 🚀");
}

run()
  .catch(e => {
    console.error("Erro:", e);
  })
  .finally(() => prisma.$disconnect());