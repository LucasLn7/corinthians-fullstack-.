# ⚽ Site de Futebol com ChatBot IA

Um site completo sobre futebol com um chatbot integrado usando inteligência artificial (Gemini 2.5 Flash), desenvolvido com HTML, CSS e JavaScript puro no frontend e Node.js no backend.

---

## 🚀 Tecnologias Utilizadas

- **HTML5** — estrutura das páginas
- **CSS3** — estilização e layout responsivo
- **JavaScript** — interatividade e lógica do frontend
- **Node.js** — servidor backend
- **Express** — framework para o servidor
- **Gemini 2.5 Flash (Google AI)** — modelo de IA do chatbot
- **dotenv** — gerenciamento seguro de variáveis de ambiente

---

## 💡 Funcionalidades

- Página principal com informações sobre futebol
- Carrossel de imagens
- Troca de tema (claro/escuro)
- ChatBot integrado com IA (Gemini) para responder perguntas
- Chave da API protegida no backend (nunca exposta no frontend)

---

## 🔒 Segurança

A chave da API do Gemini **nunca fica exposta no frontend**. Toda comunicação com a API é feita pelo servidor Node.js, que lê a chave de um arquivo `.env` ignorado pelo Git.

---

## ⚙️ Como Rodar o Projeto
 
### Pré-requisitos
- [Node.js](https://nodejs.org) instalado
 
### Passo a passo
 
**1. Clone o repositório:**
```bash
git clone https://github.com/LucasLn7/Projeto-sites-html-css-e-javascript-.
```
 
**2. Entre na pasta do projeto:**
```bash
cd Projeto-sites-html-css-e-javascript-.
```
 
**3. Instale as dependências:**
```bash
npm install
```
 
**4. Crie o arquivo `.env` na raiz do projeto:**
```
GEMINI_API_KEY=sua_chave_gemini_aqui
FOOTBALL_API_KEY=sua_chave_football_data_aqui
```
> Obtenha sua chave do Gemini gratuitamente em [aistudio.google.com](https://aistudio.google.com)  
> Obtenha sua chave do Football-Data gratuitamente em [football-data.org](https://www.football-data.org)
 
**5. Inicie o servidor:**
```bash
npm start
```
 
**6. Acesse no navegador:**
```
http://localhost:3000
```
 
---

## 📁 Estrutura do Projeto

```
📁 projeto/
├── server.js          # Servidor Node.js (backend)
├── package.json       # Dependências do projeto
├── .env               # Chave da API (não sobe pro GitHub)
├── .gitignore         # Arquivos ignorados pelo Git
└── 📁 public/         # Frontend (HTML, CSS, JS)
    ├── index.html
    ├── 📁 javascripts/
    ├── 📁 styles/
    └── 📁 imagem/
```

---
## 👨‍💻 Desenvolvedores

<p>
  <strong>Isabella Ramos</strong> — 
  <a href="https://www.linkedin.com/in/isabella-frança-3047a4285/">LinkedIn</a> · 
  <a href="https://github.com/isafranca8">GitHub</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <strong>Lucas Lima</strong> — 
  <a href="https://www.linkedin.com/in/lucas-lima-bb0043246/">LinkedIn</a> · 
  <a href="https://github.com/LucasLn7">GitHub</a>
</p>
