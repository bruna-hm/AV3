# AV3 — Como executar (passos rápidos)

Requisitos
- Node.js e npm
- MySQL acessível

Passos (Windows - PowerShell)

1) Clonar o repositório e abrir o projeto
git clone <URL-do-repositório>
cd AV3

2) Configurar variáveis de ambiente
- Crie o arquivo backend/.env baseado em backend/.env.example com a sua DATABASE_URL (MySQL).
- Exemplo (não comitar): DATABASE_URL="mysql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>"

3) Backend: instalar dependências
cd backend
npm install

4) Prisma: gerar cliente e aplicar esquema
npx prisma generate
npx prisma db push    # ou: npx prisma migrate dev (se você usa migrations)

5) Rodar servidor
npm start

Observações rápidas
- Se quiser rodar em desenvolvimento com hot-reload, use o script dev se estiver configurado: npm run dev
- Nunca comitar backend/.env (use backend/.env.example)
