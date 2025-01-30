let jogador = 1;
let nomeJogador1 = "";
let nomeJogador2 = "";
let jogoIniciado = false;
let pontuacao = { jogador1: 0, jogador2: 0 };
let maxRodadas = 1;
let rodadasJogadas = 0;

// Inicia o jogo definindo os jogadores e a quantidade de rodadas
function startGame() {
    AtivarTelaCheia();
    nomeJogador1 = document.querySelector("#player1").value.trim() || "Jogador 1";
    nomeJogador2 = document.querySelector("#player2").value.trim() || "Jogador 2";

    maxRodadas = parseInt(document.querySelector("#melhorde").value) || 1;

    document.querySelector("#player1div").innerHTML = `<h2 id="nome1">${nomeJogador1} - <span id="score1">0</span></h2>`;
    document.querySelector("#player2div").innerHTML = `<h2 id="nome2">${nomeJogador2} - <span id="score2">0</span></h2>`;

    document.querySelector('#divbotao').innerHTML = "";
    document.querySelector('#quantidadepartidas').innerHTML = "";
    document.querySelector('#textosuperior').innerHTML = "Jogadores:";

    let player1Div = document.querySelector("#nome1");
    let player2Div = document.querySelector("#nome2");

    player1Div.style.color = "rgb(255, 50, 50)";
    player2Div.style.color = "rgb(0, 100, 255)";

    jogoIniciado = true;
    atualizarTurno();
}

// Atualiza o destaque do jogador atual
function atualizarTurno() {
    let player1Div = document.querySelector("#nome1");
    let player2Div = document.querySelector("#nome2");

    player1Div.style.textDecoration = jogador === 1 ? "underline" : "none";
    player2Div.style.textDecoration = jogador === 2 ? "underline" : "none";
}

// Função para marcar X ou O
function vira(numero) {
    AtivarTelaCheia();
    if (!jogoIniciado) {
        alert("O jogo ainda não começou! Clique em 'Start'.");
        return;
    }

    let celula = document.getElementById(numero);
    if (celula.innerHTML !== "") return;

    celula.innerHTML = jogador === 1
        ? "<img src='X.png' width='80'>"
        : "<img src='circulo.jpg' width='80'>";

    jogador = jogador === 1 ? 2 : 1;
    atualizarTurno();
    validaJogo();
}

// Função para validar vitória
function validaJogo() {
    //ve se tds os espaços ja foram ocupados
    let tabuleiro = [];
    for (let i = 1; i <= 9; i++) {
        tabuleiro.push(document.getElementById(i.toString()).innerHTML);
    }

    let combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]  // Diagonais
    ];

    for (let combinacao of combinacoes) {
        let [a, b, c] = combinacao;
        if (tabuleiro[a] !== "" && tabuleiro[a] === tabuleiro[b] && tabuleiro[b] === tabuleiro[c]) {

            pontuacao[tabuleiro[a].includes("X") ? "jogador1" : "jogador2"]++;

            setTimeout(() => {
                atualizarPlacar();
                rodadasJogadas++;
                verificarFimDeJogo();
            }, 100);
            return;
        }
    }

    // Verifica empate
    if (tabuleiro.every(celula => celula !== "")) {
        setTimeout(() => {
            alert("Deu velha!");
            rodadasJogadas++;
            verificarFimDeJogo();
        }, 100);
    }
}

// Atualiza o placar
function atualizarPlacar() {
    document.getElementById("score1").textContent = pontuacao.jogador1;
    document.getElementById("score2").textContent = pontuacao.jogador2;
}

// Verifica se todas as rodadas foram jogadas
function verificarFimDeJogo() {
    if (rodadasJogadas >= maxRodadas) {
        let vencedorFinal = pontuacao.jogador1 > pontuacao.jogador2 ? nomeJogador1 : nomeJogador2;
        if (pontuacao.jogador1 === pontuacao.jogador2) {
            alert("O jogo terminou em empate!");
            reiniciarPagina();
        } else {
            document.querySelector("body").innerHTML = `
            <p>O grande campeão foi:</p>
            <p id="nomevencedor">${vencedorFinal}</p>`;

            // Alteração do fundo e outros estilos diretamente no body

            document.getElementById("nomevencedor").style.color = "rgb(213, 184, 23)";
            document.getElementById("nomevencedor").style.textDecoration = "underline";


            document.body.style.display = "flex";
            document.body.style.justifyContent = "center";
            document.body.style.alignItems = "center";
            document.body.style.color = "white";
            document.body.style.fontSize = "5rem";
            document.body.style.fontWeight = "bold";
            document.body.style.textTransform = "uppercase";

            // Aguardar 5 segundos antes de reiniciar a página
            setTimeout(() => {
                reiniciarPagina();
            }, 2000);
        }
    } else {
        reiniciarTabuleiro();
    }
}

// Reseta apenas o tabuleiro, mantendo a pontuação
function reiniciarTabuleiro() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i.toString()).innerHTML = "";
    }
    jogador = 1;
    atualizarTurno();
}

// Recarrega a página após todas as rodadas
function reiniciarPagina() {
    location.reload();
}


function AtivarTelaCheia() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}
