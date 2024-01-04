let jogadorAtual = "X";
let tabuleiro = Array(9).fill(null);
let jogoAcabou = false;
let statusJogo = "EM_ANDAMENTO";
let pontuacaoX = 0;
let pontuacaoO = 0;

function atualizarPontuacao() {
  document.getElementById(
    "pontuacao"
  ).textContent = `Jogador X - ${pontuacaoX} | Jogador O - ${pontuacaoO}`;
}

function reiniciarJogo() {
  tabuleiro.fill(null);
  jogoAcabou = false;
  statusJogo = "EM_ANDAMENTO";
  document
    .querySelectorAll(".celula")
    .forEach((celula) => (celula.textContent = ""));
  atualizarPontuacao();
}

function verificarVencedor() {
  const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combinacao of combinacoesVitoria) {
    const [a, b, c] = combinacao;
    if (
      tabuleiro[a] &&
      tabuleiro[a] === tabuleiro[b] &&
      tabuleiro[a] === tabuleiro[c]
    ) {
      statusJogo = "VITORIA";
      jogoAcabou = true;
      const vencedor = jogadorAtual === "X" ? "Jogador X" : "Jogador O";
      if (jogadorAtual === "X") {
        pontuacaoX++;
      } else {
        pontuacaoO++;
      }
      setTimeout(() => {
        alert(`${vencedor} venceu!`);
        atualizarPontuacao();
        reiniciarJogo();
      }, 100);
      return;
    }
  }

  if (!tabuleiro.includes(null)) {
    statusJogo = "EMPATE";
    jogoAcabou = true;
    setTimeout(() => {
      alert("Empate!");
      reiniciarJogo();
    }, 100);
  }
}

document.querySelectorAll(".celula").forEach((celula, indice) => {
  celula.addEventListener("click", () => {
    if (!jogoAcabou && !tabuleiro[indice]) {
      tabuleiro[indice] = jogadorAtual;
      celula.textContent = jogadorAtual;
      verificarVencedor();
      jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    }
  });
});

window.onload = reiniciarJogo;
