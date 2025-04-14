
document.addEventListener("DOMContentLoaded", function () {
  const botoes = document.querySelectorAll('.btn-interesse');

  botoes.forEach(function (botao) {
    botao.addEventListener('click', function () {
      botao.classList.toggle('remover');
      botao.textContent = botao.classList.contains('remover') ? 'REMOVER INTERESSE' : 'TENHO INTERESSE';
    });
  });

  document.getElementById("form-filtros").addEventListener("submit", function(event) {
    event.preventDefault();

    const interesseSelecionado = document.getElementById("filtro-interesse").value;
    const cards = document.querySelectorAll(".card-produto");

    cards.forEach(card => {
      const botao = card.querySelector(".btn-interesse");
      const temInteresse = botao.classList.contains("remover");

      if (interesseSelecionado === "") {
        card.style.display = "flex"; 
      } else if (interesseSelecionado === "sim" && temInteresse) {
        card.style.display = "flex";
      } else if (interesseSelecionado === "nao" && !temInteresse) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});



