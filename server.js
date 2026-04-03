// server.js - Servidor Express para lidar com as rotas de API, incluindo integração com a API Gemini para o chatbot e a API de futebol para jogos, classificação e análise.
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

app.get("/api/classificacao", async (req, res) => {
  const apiKey = process.env.FOOTBALL_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Chave da API não configurada." });
  }

  const apiUrl = "https://api.football-data.org/v4/competitions/BSA/standings";

  try {
    const response = await fetch(apiUrl, {
      headers: { "X-Auth-Token": apiKey }
    });

    const data = await response.json();

    const tabela = data.standings[0].table.map(entry => ({
      posicao: entry.position,
      time: entry.team.shortName || entry.team.name,
      timeLogo: entry.team.crest,
      jogos: entry.playedGames,
      vitorias: entry.won,
      empates: entry.draw,
      derrotas: entry.lost,
      gols: `${entry.goalsFor}:${entry.goalsAgainst}`,
      saldo: entry.goalDifference,
      pontos: entry.points,
    }));

    res.json({ tabela });

  } catch (error) {
    console.error("Erro ao buscar classificação:", error);
    res.status(500).json({ error: "Erro ao buscar classificação." });
  }
});
app.get("/api/analise", async (req, res) => {
  const apiKey = process.env.FOOTBALL_API_KEY;
 
  if (!apiKey) {
    return res.status(500).json({ error: "Chave da API não configurada." });
  }
 
  const apiUrl = "https://api.football-data.org/v4/teams/1779/matches?status=FINISHED&limit=10";
 
  try {
    const response = await fetch(apiUrl, {
      headers: { "X-Auth-Token": apiKey }
    });
 
    const data = await response.json();
 
    const CORINTHIANS_ID = 1779;
 
    const partidas = data.matches.map(match => {
      const ehCasa = match.homeTeam.id === CORINTHIANS_ID;
      const golsCasa = match.score.fullTime.home;
      const golsVisitante = match.score.fullTime.away;
 
      let resultado;
      if (golsCasa === golsVisitante) resultado = "E";
      else if (ehCasa && golsCasa > golsVisitante) resultado = "V";
      else if (!ehCasa && golsVisitante > golsCasa) resultado = "V";
      else resultado = "D";
 
      return {
        data: match.utcDate,
        competicao: match.competition.name,
        timeCasa: match.homeTeam.shortName || match.homeTeam.name,
        timeCasaLogo: match.homeTeam.crest,
        timeVisitante: match.awayTeam.shortName || match.awayTeam.name,
        timeVisitanteLogo: match.awayTeam.crest,
        golsCasa,
        golsVisitante,
        resultado,
      };
    });
 
    const stats = partidas.reduce((acc, p) => {
      acc.total++;
      if (p.resultado === "V") acc.vitorias++;
      else if (p.resultado === "E") acc.empates++;
      else acc.derrotas++;
 
      const ehCasa = p.timeCasa.toLowerCase().includes("corinthian");
      acc.golsPro += ehCasa ? p.golsCasa : p.golsVisitante;
 
      return acc;
    }, { total: 0, vitorias: 0, empates: 0, derrotas: 0, golsPro: 0 });
 
    res.json({ partidas, stats });
 
  } catch (error) {
    console.error("Erro ao buscar análise:", error);
    res.status(500).json({ error: "Erro ao buscar dados de análise." });
  }
});
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});