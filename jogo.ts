/*

Após fazer alguma alteração nesse arquivo (jogo.ts), digite o seguinte comando no terminal:
tsc jogo.ts

OBS: não altere o arquivo jogo.js!!!

*/

// =============================
// VARIÁVEIS GLOBAIS
// =============================

// Lista de símbolos das cartas
let simbolos: string[] = ["💻", "🌐", "🛜", "👩🏽‍💻", "📱", "🔗"];

let cartas: string[] = [];
let cartasViradas: HTMLElement[] = [];
let paresEncontrados: number = 0;
let tempo: number = 0;
let intervalo: number;

// Tempo máximo permitido (em segundos); se passar desse tempo e não tiver achado todos os pares, o jogador perde
let tempoMaximo: number = 60;
/*
1min = 60s
2min = 120s
3min = 180s
4min = 240s
5min = 300s
6min = 360s
*/

// Controle de fim de jogo
let jogoEncerrado: boolean = false;

// =============================
// FUNÇÃO PRINCIPAL
// =============================

window.onload = function () {
  iniciarJogo();
};

// =============================
// INICIAR JOGO
// =============================

function iniciarJogo(): void {
  cartas = [...simbolos, ...simbolos];
  cartas.sort(() => Math.random() - 0.5);
  paresEncontrados = 0;
  tempo = 0;
  jogoEncerrado = false;

  iniciarTempo();

  let tabuleiro = document.getElementById("tabuleiro")!;
  tabuleiro.innerHTML = "";

  for (let i = 0; i < cartas.length; i++) {
    let carta = document.createElement("div");
    carta.className = "carta";
    carta.dataset.valor = cartas[i];
    carta.onclick = function () {
      virarCarta(carta);
    };

    tabuleiro.appendChild(carta);
  }
}

// =============================
// VIRAR CARTA
// =============================

function virarCarta(carta: HTMLElement): void {
  if (jogoEncerrado) return;

  if (cartasViradas.length < 2 && !carta.classList.contains("virada")) {
    carta.classList.add("virada");
    carta.innerText = carta.dataset.valor!;

    cartasViradas.push(carta);

    if (cartasViradas.length === 2) {
      verificarPar();
    }
  }
}

// =============================
// VERIFICAR PAR
// =============================

function verificarPar(): void {
  let carta1 = cartasViradas[0];
  let carta2 = cartasViradas[1];

  if (carta1.dataset.valor === carta2.dataset.valor) {
    paresEncontrados++;
    cartasViradas = [];

    if (paresEncontrados === simbolos.length) {
      clearInterval(intervalo);
      jogoEncerrado = true;
      alert("Parabéns! Você venceu em " + tempo + " segundos!");
    }
  } else {
    setTimeout(function () {
      carta1.classList.remove("virada");
      carta2.classList.remove("virada");

      carta1.innerText = "";
      carta2.innerText = "";

      cartasViradas = [];
    }, 800);
  }
}

// =============================
// TEMPO
// =============================

function iniciarTempo(): void {
  intervalo = setInterval(function () {
    tempo++;
    document.getElementById("tempo")!.innerText = tempo.toString();

    if (tempo >= tempoMaximo && paresEncontrados < simbolos.length) {
      clearInterval(intervalo);
      jogoEncerrado = true;
      alert("Tempo esgotado! Você perdeu 😢");
    }
  }, 1000);
}

// =============================
// REINICIAR JOGO
// =============================

function reiniciarJogo(): void {
  clearInterval(intervalo);
  iniciarJogo();
}
