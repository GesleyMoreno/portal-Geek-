// 1. Lista de matérias (banco de dados)
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

// 2. Seleção dos elementos do DOM
const container = document.querySelector('.cards-grid');
const searchInput = document.getElementById('search-input');

// 3. Função para renderizar os cards
function carregarPosts(listaPosts) {
  container.innerHTML = "";

  if (listaPosts.length === 0) {
    container.innerHTML = `<p class="no-results">Nenhum resultado encontrado.</p>`;
    return;
  }

  listaPosts.forEach(post => {
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

// 4. Evento de busca em tempo real
searchInput.addEventListener('input', (e) => {
  const termoBusca = e.target.value.toLowerCase();

  const postsFiltrados = posts.filter(post => {
    return (
      post.titulo.toLowerCase().includes(termoBusca) ||
      post.categoria.toLowerCase().includes(termoBusca) ||
      post.descricao.toLowerCase().includes(termoBusca)
    );
  });

  carregarPosts(postsFiltrados);
});

// 5. Carregamento inicial
carregarPosts(posts);