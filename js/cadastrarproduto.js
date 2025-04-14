document.getElementById("form-produto").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const titulo = document.getElementById("titulo").value;
    const foto = document.getElementById("foto").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const interessados = parseInt(document.getElementById("interessados").value);
  
    const produto = {
      id: Date.now(),
      titulo,
      foto,
      descricao,
      categoria,
      interessados
    };
  
    const produtos = JSON.parse(localStorage.getItem("meusProdutos")) || [];
    produtos.push(produto);
    localStorage.setItem("meusProdutos", JSON.stringify(produtos));
  
    window.location.href = "meusprodutos.html"; 
  });
  
  
  