/*

Após fazer alguma alteração nesse arquivo (jogo.ts), digite o seguinte comando no terminal:
tsc jogo.ts

OBS: não altere o arquivo jogo.js!!!

*/
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// =============================
// VARIÁVEIS GLOBAIS
// =============================
// Lista de símbolos das cartas
var simbolos = ["💻", "🌐", "🛜", "👩🏽‍💻", "📱", "🔗"];
// Lista final com as cartas duplicadas e embaralhadas
var cartas = [];
// Cartas viradas no momento
var cartasViradas = [];
// Contador de pares encontrados
var paresEncontrados = 0;
// Controle de tempo
var tempo = 0;
var intervalo;
// Controla se o tempo já começou
var tempoIniciado = false;
// Tempo máximo permitido (em segundos)
var tempoMaximo = 60;
/*
1min = 60s
2min = 120s
3min = 180s
4min = 240s
5min = 300s
6min = 360s
*/
// Controle de fim de jogo
var jogoEncerrado = false;
// =============================
// FUNÇÃO PRINCIPAL
// =============================
window.onload = function () {
    iniciarJogo();
};
// =============================
// INICIAR JOGO
// =============================
function iniciarJogo() {
    // Duplica os símbolos (cria os pares)
    cartas = __spreadArray(__spreadArray([], simbolos, true), simbolos, true);
    // Embaralha as cartas
    cartas.sort(function () { return Math.random() - 0.5; });
    // Reset das variáveis
    paresEncontrados = 0;
    tempo = 0;
    tempoIniciado = false;
    jogoEncerrado = false;
    cartasViradas = [];
    // Atualiza tempo na tela
    document.getElementById("tempo").innerText = "0";
    // Limpa intervalo anterior (segurança)
    clearInterval(intervalo);
    var tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = "";
    var _loop_1 = function (i) {
        var carta = document.createElement("div");
        carta.className = "carta";
        carta.dataset.valor = cartas[i];
        carta.onclick = function () {
            virarCarta(carta);
        };
        tabuleiro.appendChild(carta);
    };
    // Cria as cartas no HTML
    for (var i = 0; i < cartas.length; i++) {
        _loop_1(i);
    }
}
// =============================
// VIRAR CARTA
// =============================
function virarCarta(carta) {
    // Se o jogo já terminou, não permite jogar
    if (jogoEncerrado)
        return;
    // Inicia o tempo apenas no primeiro clique válido
    if (!tempoIniciado) {
        iniciarTempo();
        tempoIniciado = true;
    }
    // Permite virar no máximo 2 cartas
    if (cartasViradas.length < 2 && !carta.classList.contains("virada")) {
        carta.classList.add("virada");
        carta.innerText = carta.dataset.valor;
        cartasViradas.push(carta);
        if (cartasViradas.length === 2) {
            verificarPar();
        }
    }
}
// =============================
// VERIFICAR PAR
// =============================
function verificarPar() {
    var carta1 = cartasViradas[0];
    var carta2 = cartasViradas[1];
    if (carta1.dataset.valor === carta2.dataset.valor) {
        paresEncontrados++;
        cartasViradas = [];
        // Verifica vitória
        if (paresEncontrados === simbolos.length) {
            clearInterval(intervalo);
            jogoEncerrado = true;
            alert("Parabéns! Você venceu em " + tempo + " segundos!");
        }
    }
    else {
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
function iniciarTempo() {
    intervalo = setInterval(function () {
        tempo++;
        document.getElementById("tempo").innerText = tempo.toString();
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
function reiniciarJogo() {
    clearInterval(intervalo);
    iniciarJogo();
}
