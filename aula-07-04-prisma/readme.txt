####parte 1
npm init -y
npm install express cors @prisma/client
npm install -D prisma

####parte 2

npx prisma init

####parte 3

Isso vai criar:

prisma/schema.prisma
.env

####parte 4

no .env
DATABASE_URL="mysql://user:senha@localhost:3306/meubanco"

####parte 5


Criar modelo

no prisma/schema.prisma:

model Usuario {
  id    Int     @id @default(autoincrement())
  nome  String
  email String  @unique
}

####parte 6

npx prisma migrate dev --name init


####apoio

- resetar 
npx prisma migrate reset