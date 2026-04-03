// classificacao.js - Responsável por buscar e exibir a classificação do campeonato, formatando os dados e garantindo que a interface seja responsiva e amigável.
document.addEventListener("DOMContentLoaded", async function () {

  const container = document.getElementById("tabela-container");
  if (!container) return;

  container.innerHTML = '<p class="tabela-loading">Carregando classificação...</p>';

  try {
    const response = await fetch("/api/classificacao");
    const data = await response.json();

    if (!data.tabela || data.tabela.length === 0) {
      container.innerHTML = '<p class="tabela-loading">Classificação não disponível no momento.</p>';
      return;
    }

    const linhas = data.tabela.map(time => {
      let zonaClass = "";
      if (time.posicao <= 6) zonaClass = "zona-libertadores";
      else if (time.posicao <= 12) zonaClass = "zona-sulamericana";
      else if (time.posicao >= 17) zonaClass = "zona-rebaixamento";

      const corinthiansClass = time.time.toLowerCase().includes("corinthian") ? "corinthians" : "";

      return `
        <tr class="${zonaClass} ${corinthiansClass}">
          <td class="tabela-pos">${time.posicao}</td>
          <td>
            <div class="time-info">
              <img src="${time.timeLogo}" alt="${time.time}">
              <span>${time.time}</span>
            </div>
          </td>
          <td>${time.pontos}</td>
          <td>${time.jogos}</td>
          <td>${time.vitorias}</td>
          <td>${time.empates}</td>
          <td>${time.derrotas}</td>
          <td class="col-gols">${time.gols}</td>
          <td class="col-sg">${time.saldo > 0 ? "+" + time.saldo : time.saldo}</td>
        </tr>
      `;
    }).join("");

    container.innerHTML = `
      <table class="tabela-brasileirao">
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Pts</th>
            <th>J</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th class="col-gols">Gols</th>
            <th class="col-sg">SG</th>
          </tr>
        </thead>
        <tbody>
          ${linhas}
        </tbody>
      </table>
      <div class="tabela-legenda">
        <div class="legenda-item">
          <div class="legenda-cor" style="background:#2ecc71"></div>
          <span>Libertadores (1-6)</span>
        </div>
        <div class="legenda-item">
          <div class="legenda-cor" style="background:#3498db"></div>
          <span>Sul-Americana (7-12)</span>
        </div>
        <div class="legenda-item">
          <div class="legenda-cor" style="background:#e74c3c"></div>
          <span>Rebaixamento (17-20)</span>
        </div>
      </div>
    `;

  } catch (error) {
    console.error("Erro ao carregar classificação:", error);
    container.innerHTML = '<p class="tabela-erro">Erro ao carregar a classificação. Tente novamente.</p>';
  }

});