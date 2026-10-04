// Base de dados das matérias do Portal Geek
const noticias = [
  {
    id: 1,
    titulo: "Análise: O Impacto Cultural e os Segredos do Universo dos Quadrinhos",
    categoria: "Marvel",
    descricao: "Uma exploração profunda sobre como os arcos narrativos modernos influenciaram o cinema e a cultura pop.",
    imagem: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=60",
    destaque: true,
    curiosidade: false
  },
  {
    id: 2,
    titulo: "Evolução dos Animes: Da Animação Clássica às Produções Contemporâneas",
    categoria: "Animes",
    descricao: "Entenda como a indústria de animação japonesa revolucionou a narrativa visual e conquistou o público global.",
    imagem: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=60",
    destaque: true,
    curiosidade: false
  },
  {
    id: 3,
    titulo: "A Era de Ouro das Séries: Produções Narrativas na TV e Streaming",
    categoria: "Séries",
    descricao: "Como o ritmo narrativo e a cinematografia das séries de TV rivalizam com as grandes produções de Hollywood.",
    imagem: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&auto=format&fit=crop&q=60",
    destaque: false,
    curiosidade: false
  },
  {
    id: 4,
    titulo: "Curiosidade: O Muro do Som nos Animes e Trilhas Sonoras Marcantes",
    categoria: "Animes",
    descricao: "Descubra como os compositores criam temas inesquecíveis que definem momentos icônicos na cultura pop.",
    imagem: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=60",
    destaque: false,
    curiosidade: true
  },
  {
    id: 5,
    titulo: "Os Bastidores dos Efeitos Especiais nos Filmes de Heróis",
    categoria: "Marvel",
    descricao: "Uma olhada detalhada no trabalho das equipes de CGI para dar vida a batalhas épicas no cinema.",
    imagem: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=60",
    destaque: false,
    curiosidade: true
  }
];

// Estado da Aplicação
let abaAtiva = "todos";
let categoriaAtiva = "todos";
let termoBusca = "";

// Elementos do DOM
const cardsGrid = document.querySelector(".cards-grid");
const filterButtons = document.querySelectorAll(".btn-filter");
const searchInput = document.getElementById("search-input");
const navLinks = document.querySelectorAll(".nav-link");
const modalSobre = document.getElementById("modal-sobre");
const btnSobre = document.getElementById("btn-sobre");
const btnCloseModal = document.querySelector(".close-modal");

// Função para Renderizar Cards na Tela
function renderizarCards() {
  cardsGrid.innerHTML = "";

  const noticiasFiltradas = noticias.filter(item => {
    // Filtro da Aba Superior
    let passaAba = true;
    if (abaAtiva === "destaques") passaAba = item.destaque;
    if (abaAtiva === "curiosidades") passaAba = item.curiosidade;

    // Filtro de Categoria
    let passaCategoria = true;
    if (categoriaAtiva !== "todos") passaCategoria = item.categoria === categoriaAtiva;

    // Filtro de Busca por texto
    let passaBusca = true;
    if (termoBusca.trim() !== "") {
      const termo = termoBusca.toLowerCase();
      passaBusca = item.titulo.toLowerCase().includes(termo) || 
                 item.descricao.toLowerCase().includes(termo);
    }

    return passaAba && passaCategoria && passaBusca;
  });

  if (noticiasFiltradas.length === 0) {
    cardsGrid.innerHTML = '<p class="no-results">Nenhum conteúdo encontrado para os filtros selecionados.</p>';
    return;
  }

  noticiasFiltradas.forEach(item => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <div style="position: relative;">
        <img src="${item.imagem}" alt="${item.titulo}" class="card-image" />
        ${item.destaque ? '<span class="badge-destaque">Destaque</span>' : ''}
      </div>
      <div class="card-content">
        <span class="card-category">${item.categoria}</span>
        <h3 class="card-title">${item.titulo}</h3>
        <p class="card-description">${item.descricao}</p>
      </div>
    `;

    cardsGrid.appendChild(card);
  });
}

// Eventos de Filtro por Categoria
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    categoriaAtiva = button.getAttribute("data-category");
    renderizarCards();
  });
});

// Evento de Busca
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    termoBusca = e.target.value;
    renderizarCards();
  });
}

// Navegação das Abas Superiores
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const tab = link.getAttribute("data-tab");
    
    // Se for o botão do modal "Sobre", não troca de aba
    if (link.id === "btn-sobre") return;

    e.preventDefault();
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    if (tab) {
      abaAtiva = tab;
      renderizarCards();
    }
  });
});

// Controle do Modal "Sobre o Projeto"
if (btnSobre && modalSobre && btnCloseModal) {
  btnSobre.addEventListener("click", (e) => {
    e.preventDefault();
    modalSobre.style.display = "flex";
  });

  btnCloseModal.addEventListener("click", () => {
    modalSobre.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalSobre) {
      modalSobre.style.display = "none";
    }
  });
}

// Inicialização
renderizarCards();