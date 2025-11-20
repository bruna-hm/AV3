# AV3 — Guia de Execução

## Requisitos
- Node.js (versão recomendada: 16+)
- npm
- MySQL instalado e acessível

## Passo a Passo (Windows / PowerShell / Linux / macOS)

### 1. Clonar o repositório
git clone https://github.com/bruna-hm/AV3.git
cd <caminho para onde repositório foi clonado>

### 2. Configurar variáveis de ambiente do backend
cd backend  
Copy-Item .env.example .env   (Windows PowerShell)  
cp .env.example .env          (Linux/macOS)  

Depois abra o arquivo `.env` e configure sua conexão:
DATABASE_URL="mysql://root:senha@localhost:3306/av3"

### 3. Instalar dependências
cd ..  
npm install  

cd backend  
npm install  

cd ../frontend  
npm install  

### 4. Preparar o Prisma (backend)
cd ../backend  
npx prisma generate  
npx prisma db push  

Ou, se preferir migrations:
npx prisma migrate dev

### 5. Iniciar o projeto
cd ..  
npm start  

Esse comando inicia backend e frontend ao mesmo tempo.

## Comandos alternativos
npm run backend     (executar apenas o backend)  
npm run frontend    (executar apenas o frontend)