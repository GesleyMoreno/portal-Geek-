document.addEventListener('DOMContentLoaded', () => {

  const posts = [
    {
      categoria: "Marvel",
      titulo: "Os Bastidores de Vingadores: Doomsday",
      descricao: "Análise completa dos custos de produção e o retorno do elenco."
    },
    {
      categoria: "Animes",
      titulo: "One Piece: O Impacto da Saga Final",
      descricao: "Como os últimos acontecimentos estão redefinindo a história dos chapéus de palha."
    },
    {
      categoria: "Séries",
      titulo: "Estratégia e Poder em Peaky Blinders",
      descricao: "Uma análise detalhada da ascensão de Tommy Shelby e os bastidores políticos."
    }
  ];

  const container = document.querySelector('.cards-grid');
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.btn-filter');

  let categoriaAtiva = 'todos';

  function carregarPosts() {
    if (!container) return;

    const termoBusca = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const postsFiltrados = posts.filter(post => {
      const bateCategoria = categoriaAtiva === 'todos' || post.categoria === categoriaAtiva;
      const bateTexto = post.titulo.toLowerCase().includes(termoBusca) ||
                        post.categoria.toLowerCase().includes(termoBusca) ||
                        post.descricao.toLowerCase().includes(termoBusca);

      return bateCategoria && bateTexto;
    });

    container.innerHTML = "";

    if (postsFiltrados.length === 0) {
      container.innerHTML = `<p class="no-results">Nenhum resultado encontrado.</p>`;
      return;
    }

    postsFiltrados.forEach(post => {
      const cardHTML = `
        <article class="card">
          <span class="tag">${post.categoria}</span>
          <h3>${post.titulo}</h3>
          <p>${post.descricao}</p>
        </article>
      `;
      container.innerHTML += cardHTML;
    });
  }

  // Evento de clique nos botões de categoria
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      categoriaAtiva = button.getAttribute('data-category');
      carregarPosts();
    });
  });

  // Evento de digitação na busca
  if (searchInput) {
    searchInput.addEventListener('input', carregarPosts);
  }

  // Carregamento inicial
  carregarPosts();
});