document.addEventListener('DOMContentLoaded', () => {

  const posts = [
    {
      categoria: "Marvel",
      titulo: "Os Bastidores de Vingadores: Doomsday",
      descricao: "Análise completa dos custos de produção, elenco e os rumos do multiverso.",
      imagem: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=600&q=80"
    },
    {
      categoria: "Animes",
      titulo: "One Piece: O Impacto da Saga Final",
      descricao: "Como os últimos acontecimentos estão redefinindo a jornada dos Chapéus de Palha.",
      imagem: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80"
    },
    {
      categoria: "Séries",
      titulo: "Estratégia e Poder em Peaky Blinders",
      descricao: "Uma análise detalhada da ascensão de Tommy Shelby e os bastidores políticos.",
      imagem: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    {
      categoria: "Animes",
      titulo: "Evolução do World-Building em Isekai",
      descricao: "Explorando a construção de mundo e magia nas obras modernas de fantasia.",
      imagem: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80"
    },
    {
      categoria: "Marvel",
      titulo: "O Futuro dos X-Men no Cinema",
      descricao: "Expectativas e teorias sobre como os mutantes serão introduzidos.",
      imagem: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
    },
    {
      categoria: "Séries",
      titulo: "Produções de Ficção Científica em 2026",
      descricao: "As novas séries que prometem revolucionar os efeitos visuais e narrativas.",
      imagem: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
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
          <img src="${post.imagem}" alt="${post.titulo}" class="card-image" />
          <div class="card-body">
            <span class="tag">${post.categoria}</span>
            <h3>${post.titulo}</h3>
            <p>${post.descricao}</p>
          </div>
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