document.addEventListener("DOMContentLoaded", async function () {

  const container = document.getElementById("jogos-container");

  if (!container) return;

  container.innerHTML = '<p class="jogos-loading">Carregando jogos...</p>';

  try {
    const response = await fetch("/api/jogos");
    const data = await response.json();

    if (!data.jogos || data.jogos.length === 0) {
      container.innerHTML = '<p class="jogos-loading">Nenhum jogo agendado no momento.</p>';
      return;
    }

    container.innerHTML = data.jogos.map(jogo => {
      const data_jogo = new Date(jogo.data);

      const dia = data_jogo.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "America/Sao_Paulo"
      });

      const hora = data_jogo.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo"
      });

      return `
        <div class="jogo-card">
          <div class="jogo-competicao">🏆 ${jogo.competicao}</div>
          <div class="jogo-times">
            <span>${jogo.timeCasa}</span>
            <span class="jogo-vs">VS</span>
            <span>${jogo.timeVisitante}</span>
          </div>
          <div class="jogo-data">📅 ${dia} • 🕖 ${hora}</div>
          <div class="jogo-estadio">📍 ${jogo.estadio}</div>
        </div>
      `;
    }).join("");

  } catch (error) {
    console.error("Erro ao carregar jogos:", error);
    container.innerHTML = '<p class="jogos-erro">Erro ao carregar os jogos. Tente novamente.</p>';
  }

});
