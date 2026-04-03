// menu.js - Responsável por gerar dinamicamente os itens do menu de navegação, tanto para desktop quanto para mobile, e destacar a página atual.
(function () {
 
  const isSubpage = window.location.pathname.includes("/pages/");
  const base = isSubpage ? "../" : "";
  const paginaAtual = window.location.pathname;
 
  // Links normais do menu
  const links = [
    { label: "Início",         href: `${base}index.html#home` },
    { label: "Títulos",        href: `${base}index.html#titulos` },
    { label: "Próximos jogos", href: `${base}index.html#jogos` },
    { label: "Classificação",  href: `${base}index.html#classificacao` },
    { label: "Saiba mais",     href: `${base}index.html#saiba` },
  ];
 
  // Páginas separadas (dropdown)
  const paginas = [
    { label: "📊 Análise", href: `${base}pages/analise.html` },
    // Adicione novas páginas aqui no futuro!
  ];
 
  // Gera os itens normais
  function gerarItens() {
    return links.map(link => {
      const ativo = !paginaAtual.includes("pages/") && link.label === "Início" ? "active" : "";
      return `<li class="nav-item ${ativo}"><a href="${link.href}">${link.label}</a></li>`;
    }).join("");
  }
 
  // Gera o dropdown de páginas
  function gerarDropdown() {
    const itens = paginas.map(p => {
      const ativo = paginaAtual.includes(p.href.replace(base, "")) ? "dropdown-ativo" : "";
      return `<li class="${ativo}"><a href="${p.href}">${p.label}</a></li>`;
    }).join("");
 
    return `
      <li class="nav-item dropdown">
        <a href="#" class="dropdown-toggle">
          Páginas <i class="fa-solid fa-chevron-down dropdown-icon"></i>
        </a>
        <ul class="dropdown-menu">
          ${itens}
        </ul>
      </li>
    `;
  }
 
  // Gera itens mobile (sem dropdown, mostra tudo direto)
  function gerarItensMobile() {
    const normais = links.map(link => {
      const ativo = !paginaAtual.includes("pages/") && link.label === "Início" ? "active" : "";
      return `<li class="nav-item ${ativo}"><a href="${link.href}">${link.label}</a></li>`;
    }).join("");
 
    const extras = paginas.map(p => {
      const ativo = paginaAtual.includes(p.href.replace(base, "")) ? "active" : "";
      return `<li class="nav-item ${ativo}"><a href="${p.href}">${p.label}</a></li>`;
    }).join("");
 
    return normais + extras;
  }
 
  // Injeta no menu desktop
  const navList = document.getElementById("nav_list");
  if (navList) navList.innerHTML = gerarItens() + gerarDropdown();
 
  // Injeta no menu mobile
  const mobileList = document.getElementById("mobile_nav_list");
  if (mobileList) mobileList.innerHTML = gerarItensMobile();
 
})();