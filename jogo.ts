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

// Lista final com as cartas duplicadas e embaralhadas
let cartas: string[] = [];

// Cartas viradas no momento
let cartasViradas: HTMLElement[] = [];

// Contador de pares encontrados
let paresEncontrados: number = 0;

// Controle de tempo
let tempo: number = 0;
let intervalo: number;

// Controla se o tempo já começou
let tempoIniciado: boolean = false;

// Tempo máximo permitido (em segundos)
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

  // Duplica os símbolos (cria os pares)
  cartas = [...simbolos, ...simbolos];

  // Embaralha as cartas
  cartas.sort(() => Math.random() - 0.5);

  // Reset das variáveis
  paresEncontrados = 0;
  tempo = 0;
  tempoIniciado = false;
  jogoEncerrado = false;
  cartasViradas = [];

  // Atualiza tempo na tela
  document.getElementById("tempo")!.innerText = "0";

  // Limpa intervalo anterior (segurança)
  clearInterval(intervalo);

  let tabuleiro = document.getElementById("tabuleiro")!;
  tabuleiro.innerHTML = "";

  // Cria as cartas no HTML
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

  // Se o jogo já terminou, não permite jogar
  if (jogoEncerrado) return;

  // Inicia o tempo apenas no primeiro clique válido
  if (!tempoIniciado) {
    iniciarTempo();
    tempoIniciado = true;
  }

  // Permite virar no máximo 2 cartas
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

    // Verifica vitória
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
// CONTROLE DO TEMPO
// =============================

function iniciarTempo(): void {

  intervalo = setInterval(function () {

    tempo++;
    document.getElementById("tempo")!.innerText = tempo.toString();

    // Verifica derrota por tempo
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