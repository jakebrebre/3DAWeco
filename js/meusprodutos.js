function renderizarProdutos(filtroInteresse = "") {
  const lista = document.getElementById('lista-produtos');
  lista.innerHTML = "";

  const produtos = JSON.parse(localStorage.getItem('meusProdutos')) || [];

  const filtrados = filtroInteresse === "com"
    ? produtos.filter(p => p.interessados > 0)
    : filtroInteresse === "sem"
    ? produtos.filter(p => !p.interessados || p.interessados === 0)
    : produtos;

  if (filtrados.length === 0) {
    lista.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  filtrados.forEach(produto => {
    const div = document.createElement('div');
    div.className = "card-produto";
    div.setAttribute('data-id', produto.id);

    div.innerHTML = `
      <div class="modo-visualizacao">
        <img src="${produto.foto}" alt="Imagem do produto">
        <div class="info-produto">
          <h3>${produto.titulo}</h3>
          <p>${produto.descricao}</p>
          <div class="botoes-produto">
            <button onclick="editarProduto(${produto.id})">Editar</button>
            <button onclick="excluirProduto(${produto.id})">Excluir</button>
            ${produto.interessados > 0 ? `<button>Ver Interessados</button>` : ""}
          </div>
        </div>
      </div>

      <div class="modo-edicao" style="display:none;">
        <input type="text" class="edit-titulo" value="${produto.titulo}">
        <textarea class="edit-descricao">${produto.descricao}</textarea>
        <input type="text" class="edit-foto" value="${produto.foto}">
        <div class="botoes-produto">
          <button onclick="salvarEdicao(${produto.id})">Salvar</button>
          <button onclick="cancelarEdicao(${produto.id})">Cancelar</button>
        </div>
      </div>
    `;

    lista.appendChild(div);
  });
}

function editarProduto(id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  card.querySelector('.modo-visualizacao').style.display = 'none';
  card.querySelector('.modo-edicao').style.display = 'block';
}

function cancelarEdicao(id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  card.querySelector('.modo-edicao').style.display = 'none';
  card.querySelector('.modo-visualizacao').style.display = 'block';
}

function salvarEdicao(id) {
  const produtos = JSON.parse(localStorage.getItem('meusProdutos')) || [];
  const index = produtos.findIndex(p => p.id === id);

  const card = document.querySelector(`[data-id="${id}"]`);
  const novoTitulo = card.querySelector('.edit-titulo').value;
  const novaDescricao = card.querySelector('.edit-descricao').value;
  const novaFoto = card.querySelector('.edit-foto').value;

  if (index !== -1) {
    produtos[index].titulo = novoTitulo;
    produtos[index].descricao = novaDescricao;
    produtos[index].foto = novaFoto;
    localStorage.setItem('meusProdutos', JSON.stringify(produtos));
    renderizarProdutos(); 
  }
}

function excluirProduto(id) {
  const produtos = JSON.parse(localStorage.getItem('meusProdutos')) || [];
  const novos = produtos.filter(p => p.id !== id);
  localStorage.setItem('meusProdutos', JSON.stringify(novos));
  renderizarProdutos();
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarProdutos();

  const form = document.getElementById('form-filtros');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const valor = document.getElementById('filtro-interesse').value;
      renderizarProdutos(valor);
    });
  }
});
