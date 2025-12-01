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
cd .. (se estiver seguindo os passos anteriores)
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
cd .. (se estiver seguindo os passos anteriores) 
npm start  

Esse comando inicia backend e frontend ao mesmo tempo.

## Comandos alternativos
npm run backend     (executar apenas o backend)  
npm run frontend    (executar apenas o frontend)  
  
## Testes de performance de API
- k6 deve estar instalado e acessível

k6 run .\backend\k6\nome_do_script_que_deseja_executar

Relatório com informações para interpretação dos dados está em:
.\relatorio\relatorio_av3
