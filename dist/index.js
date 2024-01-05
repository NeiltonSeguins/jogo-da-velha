"use strict";
// Tipos básicos
let jogoAcabou = false;
let pontuacaoX = 0;
let pontuacaoO = 0;
let jogadorAtual = "X";
let tabuleiro = Array(9).fill(null);
// Tuplas
let tuplaVencedora;
// Enums
var StatusJogo;
(function (StatusJogo) {
  StatusJogo["EmAndamento"] = "EM_ANDAMENTO";
  StatusJogo["Vitoria"] = "VITORIA";
  StatusJogo["Empate"] = "EMPATE";
})(StatusJogo || (StatusJogo = {}));
// Uso de Enums
let statusJogo = StatusJogo.EmAndamento;
// Type Assertions
const elementoTabuleiro = document.getElementById("board");
const celulas = Array.from(elementoTabuleiro.querySelectorAll(".celula"));
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
      statusJogo = StatusJogo.Vitoria;
      jogoAcabou = true;
      const vencedor = jogadorAtual === "X" ? `Jogador X` : `Jogador O`;
      if (jogadorAtual === "X") {
        pontuacaoX++;
      } else {
        pontuacaoO++;
      }
      setTimeout(() => {
        alert(`${vencedor} venceu!`);
        reiniciarJogo();
      }, 100);
      return;
    }
  }
  if (!tabuleiro.includes(null)) {
    statusJogo = StatusJogo.Empate;
    jogoAcabou = true;
    setTimeout(() => {
      alert("Empate!");
      reiniciarJogo();
    }, 100);
  }
}
// Utilizando Generics
function atualizarPontuacao() {
  document.getElementById(
    "pontuacao"
  ).textContent = `Jogador (X) - ${pontuacaoX} | Jogador (O) - ${pontuacaoO}`;
}
// Funções
function reiniciarJogo() {
  tabuleiro.fill(null);
  jogoAcabou = false;
  statusJogo = StatusJogo.EmAndamento;
  celulas.forEach((celula) => (celula.textContent = ""));
  atualizarPontuacao();
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
