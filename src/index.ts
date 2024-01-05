// Tipos básicos
let jogoAcabou: boolean = false;
let pontuacaoX: number = 0;
let pontuacaoO: number = 0;

type SimboloJogador = "X" | "O";
let jogadorAtual: SimboloJogador = "X";
let tabuleiro: Array<SimboloJogador | null> = Array(9).fill(null);

// Tuplas
let tuplaVencedora: [number, number, number];
// Types
type CombinacaoVencedora = typeof tuplaVencedora;

// Enums
enum StatusJogo {
  EmAndamento = "EM_ANDAMENTO",
  Vitoria = "VITORIA",
  Empate = "EMPATE",
}

// Uso de Enums
let statusJogo: StatusJogo = StatusJogo.EmAndamento;

// Type Assertions
const elementoTabuleiro = document.getElementById("board") as HTMLDivElement;
const celulas = Array.from(
  elementoTabuleiro.querySelectorAll(".celula")
) as Array<HTMLDivElement>;

function verificarVencedor(): void {
  const combinacoesVitoria: CombinacaoVencedora[] = [
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
function atualizarPontuacao(): void {
  document.getElementById(
    "pontuacao"
  )!.textContent = `Jogador (X) - ${pontuacaoX} | Jogador (O) - ${pontuacaoO}`;
}

// Funções
function reiniciarJogo(): void {
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
