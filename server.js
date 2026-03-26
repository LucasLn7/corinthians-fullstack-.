const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensagem vazia." });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Chave da API não configurada." });
  }
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;  
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    const data = await response.json();
    const botMessage = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Não consegui responder.";
    res.json({ reply: botMessage });

  } catch (error) {
    console.error("Erro ao chamar o Gemini:", error);
    res.status(500).json({ error: "Erro ao falar com o bot." });
  }
});

app.get("/api/jogos", async (req, res) => {
  const apiKey = process.env.FOOTBALL_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Chave da API de futebol não configurada." });
  }

  const apiUrl = "https://api.football-data.org/v4/teams/1779/matches?status=SCHEDULED&limit=5";
  try {
    const response = await fetch(apiUrl, {
      headers: { "X-Auth-Token": apiKey }
    });

    const data = await response.json();

    const jogos = data.matches.map(match => ({
      competicao: match.competition.name,
      competicaoLogo: match.competition.emblem,
      data: match.utcDate,
      timeCasa: match.homeTeam.shortName || match.homeTeam.name,
      timeCasaLogo: match.homeTeam.crest,
      timeVisitante: match.awayTeam.shortName || match.awayTeam.name,
      timeVisitanteLogo: match.awayTeam.crest,
}));

    res.json({ jogos });

  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    res.status(500).json({ error: "Erro ao buscar jogos." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});