
function trocarAba(abaId) {
    // Oculta todos os conteúdos das abas
    const conteudos = document.querySelectorAll('#saiba .conteudo');
    conteudos.forEach(conteudo => {
        conteudo.classList.remove('ativo');
    });
    

    const abaSelecionada = document.getElementById(abaId);
    if (abaSelecionada) {
        abaSelecionada.classList.add('ativo');
    }
    
  
    const mensagemInicial = document.getElementById('mensagem-inicial');
    if (mensagemInicial) {
        mensagemInicial.style.display = 'none';
    }
    
      document.querySelectorAll('.tabs span').forEach(span => {
        span.classList.remove('active');
    });
    document.querySelector(`.tabs span[onclick="trocarAba('${abaId}')"]`).classList.add('active');
}

function mostrarMensagemInicial() {
    const mensagemInicial = document.getElementById('mensagem-inicial');
    if (mensagemInicial) {
        mensagemInicial.style.display = 'block';
    }
    
  
    const conteudos = document.querySelectorAll('#saiba .conteudo');
    conteudos.forEach(conteudo => {
        conteudo.classList.remove('ativo');
    });
}

