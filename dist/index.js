"use strict";
// Tipos básicos
let jogoAcabou = false;
let pontuacaoX = 0;
let pontuacaoO = 0;
let jogadorAtual = "X";
let tabuleiro = Array(9).fill(null);
let jogador1 = { nome: "", simbolo: "X" };
let jogador2 = { nome: "", simbolo: "O" };
function iniciarJogo() {
  const nomeJogador1 = document.getElementById("nomeJogador1").value;
  const nomeJogador2 = document.getElementById("nomeJogador2").value;
  jogador1 = { nome: nomeJogador1, simbolo: "X" };
  jogador2 = { nome: nomeJogador2, simbolo: "O" };
  atualizarPontuacao(jogador1, jogador2);
  document.querySelector(".entrada-jogador").classList.add("escondido");
  document.getElementById("containerJogo").classList.remove("escondido");
}
// Adicionar evento de clique ao botão de iniciar jogo
document.getElementById("botaoIniciar").addEventListener("click", iniciarJogo);
// Type Assertions
const elementoTabuleiro = document.getElementById("board");
const celulas = Array.from(elementoTabuleiro.querySelectorAll(".celula"));
// Enums
var StatusJogo;
(function (StatusJogo) {
  StatusJogo["EmAndamento"] = "EM_ANDAMENTO";
  StatusJogo["Vitoria"] = "VITORIA";
  StatusJogo["Empate"] = "EMPATE";
})(StatusJogo || (StatusJogo = {}));
// Uso de Enums
let statusJogo = StatusJogo.EmAndamento;
// Utilizando Generics
function atualizarPontuacao(jogador1, jogador2) {
  document.getElementById(
    "pontuacao"
  ).textContent = `${jogador1.nome} (X) - ${pontuacaoX} | ${jogador2.nome} (O) - ${pontuacaoO}`;
}
// Funções
function reiniciarJogo() {
  tabuleiro.fill(null);
  jogoAcabou = false;
  statusJogo = StatusJogo.EmAndamento;
  celulas.forEach((celula) => (celula.textContent = ""));
  atualizarPontuacao(jogador1, jogador2);
}
// Tuplas
let tuplaVencedora;
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
      const vencedor =
        jogadorAtual === "X"
          ? `Jogador ${jogador1.nome}`
          : `Jogador ${jogador2.nome}`;
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
