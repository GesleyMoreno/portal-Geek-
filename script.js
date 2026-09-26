// 1. Dados das matérias (Simulando um banco de dados/API)
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

// 2. Seleciona o container do HTML onde os cards vão entrar
const container = document.querySelector('.cards-grid');

// 3. Função para renderizar os cards dinamicamente
function carregarPosts() {
  container.innerHTML = ""; // Limpa o container

  posts.forEach(post => {
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

// Executa a função ao carregar a página
carregarPosts();