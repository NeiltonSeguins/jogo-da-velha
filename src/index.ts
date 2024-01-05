// Tipos básicos
let jogoAcabou: boolean = false;
let pontuacaoX: number = 0;
let pontuacaoO: number = 0;

type SimboloJogador = "X" | "O";
let jogadorAtual: SimboloJogador = "X";
let tabuleiro: Array<SimboloJogador | null> = Array(9).fill(null);

// Interfaces
interface Jogador {
  nome: string;
  simbolo: SimboloJogador;
}

let jogador1: Jogador = { nome: "", simbolo: "X" };
let jogador2: Jogador = { nome: "", simbolo: "O" };

// Type Assertions
function iniciarJogo(): void {
  const nomeJogador1 = (
    document.getElementById("nomeJogador1") as HTMLInputElement
  ).value;
  const nomeJogador2 = (
    document.getElementById("nomeJogador2") as HTMLInputElement
  ).value;

  jogador1 = { nome: nomeJogador1, simbolo: "X" };
  jogador2 = { nome: nomeJogador2, simbolo: "O" };

  atualizarPontuacao(jogador1, jogador2);
  document.querySelector(".entrada-jogador")!.classList.add("escondido");
  document.getElementById("containerJogo")!.classList.remove("escondido");
}

// Adicionar evento de clique ao botão de iniciar jogo
document.getElementById("botaoIniciar")!.addEventListener("click", iniciarJogo);

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

// Utilizando Generics
function atualizarPontuacao<T extends Jogador>(jogador1: T, jogador2: T): void {
  document.getElementById(
    "pontuacao"
  )!.textContent = `${jogador1.nome} (X) - ${pontuacaoX} | ${jogador2.nome} (O) - ${pontuacaoO}`;
}

// Funções
function reiniciarJogo(): void {
  tabuleiro.fill(null);
  jogoAcabou = false;
  statusJogo = StatusJogo.EmAndamento;
  celulas.forEach((celula) => (celula.textContent = ""));
  atualizarPontuacao(jogador1, jogador2);
}

// Tuplas
let tuplaVencedora: [number, number, number];
// Types
type CombinaçãoVencedora = typeof tuplaVencedora;

function verificarVencedor() {
  const combinacoesVitoria: CombinaçãoVencedora[] = [
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
