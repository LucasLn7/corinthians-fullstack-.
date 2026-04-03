// analise.js - Responsável por buscar e exibir os dados de análise do time, formatando os dados e garantindo que a interface seja responsiva e amigável.
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/api/analise");
    const data = await response.json();
 
    if (data.error) {
      document.getElementById("stats-grid").innerHTML = `<p class="analise-loading">${data.error}</p>`;
      return;
    }
 
    const { partidas, stats } = data;
 
    const aproveitamento = ((stats.vitorias * 3) / (stats.total * 3) * 100).toFixed(0);
 
    document.getElementById("stats-grid").innerHTML = `
      <div class="stat-card vitorias">
        <div class="stat-icon">✅</div>
        <div class="stat-valor">${stats.vitorias}</div>
        <div class="stat-label">Vitórias</div>
      </div>
      <div class="stat-card empates">
        <div class="stat-icon">🟡</div>
        <div class="stat-valor">${stats.empates}</div>
        <div class="stat-label">Empates</div>
      </div>
      <div class="stat-card derrotas">
        <div class="stat-icon">❌</div>
        <div class="stat-valor">${stats.derrotas}</div>
        <div class="stat-label">Derrotas</div>
      </div>
      <div class="stat-card aproveitamento">
        <div class="stat-icon">📊</div>
        <div class="stat-valor">${aproveitamento}%</div>
        <div class="stat-label">Aproveitamento</div>
      </div>
      <div class="stat-card gols-pro">
        <div class="stat-icon">⚽</div>
        <div class="stat-valor">${stats.golsPro}</div>
        <div class="stat-label">Gols Marcados</div>
      </div>
    `;
 
    const ctxPizza = document.getElementById("graficoPizza").getContext("2d");
    new Chart(ctxPizza, {
      type: "doughnut",
      data: {
        labels: ["Vitórias", "Empates", "Derrotas"],
        datasets: [{
          data: [stats.vitorias, stats.empates, stats.derrotas],
          backgroundColor: ["#2ecc71", "#f39c12", "#e74c3c"],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { color: "#ccc", padding: 16, font: { size: 12 } } }
        }
      }
    });
 
    const partidas10 = partidas.slice(0, 10).reverse();
    let pontosAcumulados = 0;
    const pontosPorJogo = partidas10.map(p => {
      if (p.resultado === "V") pontosAcumulados += 3;
      else if (p.resultado === "E") pontosAcumulados += 1;
      return pontosAcumulados;
    });
 
    const ctxLinha = document.getElementById("graficoLinha").getContext("2d");
    new Chart(ctxLinha, {
      type: "line",
      data: {
        labels: partidas10.map((_, i) => `Jogo ${i + 1}`),
        datasets: [{
          label: "Pontos acumulados",
          data: pontosPorJogo,
          borderColor: "#c0392b",
          backgroundColor: "rgba(192,57,43,0.15)",
          borderWidth: 2,
          pointBackgroundColor: "#c0392b",
          pointRadius: 4,
          fill: true,
          tension: 0.3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "#ccc" } } },
        scales: {
          x: { ticks: { color: "#888" }, grid: { color: "rgba(255,255,255,0.05)" } },
          y: { ticks: { color: "#888" }, grid: { color: "rgba(255,255,255,0.05)" } }
        }
      }
    });
 
    const container = document.getElementById("resultados-container");
    container.innerHTML = partidas.slice(0, 10).map(p => {
      const badge = p.resultado === "V" ? "badge-v" : p.resultado === "E" ? "badge-e" : "badge-d";
      const cardClass = p.resultado === "V" ? "vitoria" : p.resultado === "E" ? "empate" : "derrota";
      const texto = p.resultado;
      const data = new Date(p.data).toLocaleDateString("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric", timeZone: "America/Sao_Paulo"
      });
 
      return `
        <div class="resultado-card ${cardClass}">
          <div class="resultado-times">
            <img src="${p.timeCasaLogo}" alt="${p.timeCasa}">
            <span class="time-nome">${p.timeCasa}</span>
          </div>
          <div class="resultado-placar">${p.golsCasa} x ${p.golsVisitante}</div>
          <div class="resultado-times" style="justify-content: flex-end;">
            <span class="time-nome">${p.timeVisitante}</span>
            <img src="${p.timeVisitanteLogo}" alt="${p.timeVisitante}">
          </div>
          <div class="resultado-info">
            <span class="resultado-badge ${badge}">${texto}</span>
            <div>${data}</div>
            <div>${p.competicao}</div>
          </div>
        </div>
      `;
    }).join("");
 
  } catch (error) {
    console.error("Erro ao carregar análise:", error);
    document.getElementById("stats-grid").innerHTML = '<p class="analise-loading">Erro ao carregar dados.</p>';
  }
});