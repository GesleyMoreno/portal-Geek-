const noticias = [
  {
    id: 1,
    titulo: "Análise: O Impacto Cultural e os Segredos do Universo dos Quadrinhos",
    categoria: "Marvel",
    descricao: "Uma exploração profunda sobre como os arcos narrativos modernos influenciaram o cinema e a cultura pop.",
    conteudo: "Os quadrinhos deixaram de ser apenas entretenimento infanto-juvenil para se tornarem os pilares da indústria cinematográfica moderna. Ao longo das últimas décadas, a transição das HQs para as telonas redefiniu estratégias de estúdios e criou um universo compartilhado dinâmico. Personagens complexos e dilemas morais profundos continuam cativando diferentes gerações.",
    imagem: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=60",
    destaque: true,
    curiosidade: false
  },
  {
    id: 2,
    titulo: "Evolução dos Animes: Da Animação Clássica às Produções Contemporâneas",
    categoria: "Animes",
    descricao: "Entenda como a indústria de animação japonesa revolucionou a narrativa visual e conquistou o público global.",
    conteudo: "A animação japonesa evoluiu de traços manuais simples para produções digitais complexas e altamente detalhadas. O impacto global de animes redefiniu a forma como histórias de fantasia, ficção científica e aventura são contadas, conquistando milhões de fãs no mundo todo.",
    imagem: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=60",
    destaque: true,
    curiosidade: false
  },
  {
    id: 3,
    titulo: "A Era de Ouro das Séries: Produções Narrativas na TV e Streaming",
    categoria: "Séries",
    descricao: "Como o ritmo narrativo e a cinematografia das séries de TV rivalizam com as grandes produções de Hollywood.",
    conteudo: "As plataformas de streaming transformaram o consumo de entretenimento. Com orçamentos milionários e roteiros refinados, as séries de TV hoje rivalizam diretamente com as maiores produções cinematográficas em qualidade técnica e profundidade de personagens.",
    imagem: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&auto=format&fit=crop&q=60",
    destaque: false,
    curiosidade: false
  },
  {
    id: 4,
    titulo: "Curiosidade: O Muro do Som nos Animes e Trilhas Sonoras Marcantes",
    categoria: "Animes",
    descricao: "Descubra como os compositores criam temas inesquecíveis que definem momentos icônicos na cultura pop.",
    conteudo: "A trilha sonora é metade da experiência emocional de um anime. Compositores combinam orquestras épicas, elementos eletrônicos e rock para criar temas inesquecíveis que elevam as cenas mais marcantes da animação.",
    imagem: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=60",
    destaque: false,
    curiosidade: true
  },
  {
    id: 5,
    titulo: "Os Bastidores dos Efeitos Especiais nos Filmes de Heróis",
    categoria: "Marvel",
    descricao: "Uma olhada detalhada no trabalho das equipes de CGI para dar vida a batalhas épicas no cinema.",
    conteudo: "O trabalho invisível de centenas de artistas de CGI torna possíveis mundos fantásticos e batalhas colossais. Entenda o processo de pós-produção e computação gráfica que transforma gravações em estúdio em espetáculos visuais.",
    imagem: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=60",
    destaque: false,
    curiosidade: true
  }
];

// Referências do DOM
const cardsGrid = document.getElementById("cards-grid");
const filterButtons = document.querySelectorAll(".btn-filter");
const navLinks = document.querySelectorAll(".nav-link");
const searchInput = document.getElementById("search-input");

// Referências dos Modais
const modalSobre = document.getElementById("modal-sobre");
const btnSobre = document.getElementById("btn-sobre");
const btnCloseSobre = document.querySelector(".close-sobre");

const modalNoticia = document.getElementById("modal-noticia");
const btnCloseNoticia = document.querySelector(".close-noticia");
const noticiaCategoria = document.getElementById("noticia-categoria");
const noticiaTitulo = document.getElementById("noticia-titulo");
const noticiaImagem = document.getElementById("noticia-imagem");
const noticiaCorpo = document.getElementById("noticia-corpo");

let categoriaAtiva = "todos";
let abaAtiva = "todos";
let termoBusca = "";

// Função para renderizar os cards na tela
function renderizarCards() {
  cardsGrid.innerHTML = "";

  const noticiasFiltradas = noticias.filter(item => {
    // Filtro por Aba Superior
    if (abaAtiva === "destaques" && !item.destaque) return false;
    if (abaAtiva === "curiosidades" && !item.curiosidade) return false;

    // Filtro por Categoria (Botoes)
    if (categoriaAtiva !== "todos" && item.categoria !== categoriaAtiva) return false;

    // Filtro de Busca por Texto
    if (termoBusca) {
      const termo = termoBusca.toLowerCase();
      const tituloMatch = item.titulo.toLowerCase().includes(termo);
      const descMatch = item.descricao.toLowerCase().includes(termo);
      if (!tituloMatch && !descMatch) return false;
    }

    return true;
  });

  if (noticiasFiltradas.length === 0) {
    cardsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888;">Nenhuma notícia encontrada.</p>`;
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

    // Clique no card para abrir a matéria
    card.addEventListener("click", () => abrirMateria(item));

    cardsGrid.appendChild(card);
  });
}

// Abrir Matéria Completa
function abrirMateria(item) {
  noticiaCategoria.textContent = item.categoria;
  noticiaTitulo.textContent = item.titulo;
  noticiaImagem.src = item.imagem;
  noticiaImagem.alt = item.titulo;
  noticiaCorpo.innerHTML = `<p>${item.conteudo}</p>`;
  modalNoticia.style.display = "flex";
}

// Filtro por Categorias (Botões de filtro)
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    categoriaAtiva = btn.getAttribute("data-category");
    renderizarCards();
  });
});

// Navegação Superior (Abas)
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const tab = link.getAttribute("data-tab");
    if (!tab) return; // Caso seja o botão "Sobre o Projeto"
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    abaAtiva = tab;
    renderizarCards();
  });
});

// Busca por Texto
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    termoBusca = e.target.value;
    renderizarCards();
  });
}

// Eventos de Abrir/Fechar Modais
if (btnSobre) {
  btnSobre.addEventListener("click", (e) => {
    e.preventDefault();
    modalSobre.style.display = "flex";
  });
}

if (btnCloseSobre) {
  btnCloseSobre.addEventListener("click", () => {
    modalSobre.style.display = "none";
  });
}

if (btnCloseNoticia) {
  btnCloseNoticia.addEventListener("click", () => {
    modalNoticia.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modalSobre) modalSobre.style.display = "none";
  if (e.target === modalNoticia) modalNoticia.style.display = "none";
});

// Inicializa a exibição dos cards
renderizarCards();