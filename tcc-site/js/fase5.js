/* =======================
   DIÁLOGO
======================= */
const dialogos = [
    "Consegui escapar do balcão...",
    "Mas agora estou preso em um labirinto!",
    "Use as setas do teclado para me ajudar.",
    "Vamos lá!"
];

let dialogIndex = 0;

const intro = document.getElementById("intro");
const textEl = document.getElementById("speech-text");
const nextBtn = document.getElementById("next-dialog");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const endScreen = document.getElementById("end");
const nextPhaseBtn = document.getElementById("proximaFase");

textEl.innerText = dialogos[dialogIndex];

nextBtn.addEventListener("click", () => {
    dialogIndex++;

    if (dialogIndex < dialogos.length) {
        textEl.innerText = dialogos[dialogIndex];
    } else {
        intro.classList.add("hidden");
        canvas.classList.remove("hidden");
        iniciarJogo();
    }
});

/* =======================
   LABIRINTO (0 = CAMINHO | 1 = PAREDE)
======================= */
const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]
];

const player = { x: 1, y: 1 };
const exit = { x: 10, y: 9 };

let tileSize = 0;

const imgPlayer = new Image();
imgPlayer.src = "img/zero.png";

/* =======================
   INICIAR JOGO
======================= */
function iniciarJogo() {
    ajustarCanvas();
    desenharLabirinto();
}

window.addEventListener("resize", ajustarCanvas);

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    tileSize = Math.floor(
        Math.min(
            canvas.width / maze[0].length,
            canvas.height / maze.length
        )
    );

    desenharLabirinto();
}

/* =======================
   DESENHO
======================= */
function desenharLabirinto() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = "#333";
                ctx.fillRect(
                    x * tileSize,
                    y * tileSize,
                    tileSize,
                    tileSize
                );
            }
        }
    }

    // saída
    ctx.fillStyle = "#00ff66";
    ctx.fillRect(exit.x * tileSize, exit.y * tileSize, tileSize, tileSize);

    // jogador
    ctx.drawImage(
        imgPlayer,
        player.x * tileSize,
        player.y * tileSize,
        tileSize,
        tileSize
    );
}

/* =======================
   MOVIMENTO BLOCO A BLOCO
======================= */
document.addEventListener("keydown", e => {
    if (canvas.classList.contains("hidden")) return;

    let nx = player.x;
    let ny = player.y;

    if (e.key === "ArrowUp") ny--;
    if (e.key === "ArrowDown") ny++;
    if (e.key === "ArrowLeft") nx--;
    if (e.key === "ArrowRight") nx++;

    if (maze[ny] && maze[ny][nx] === 0) {
        player.x = nx;
        player.y = ny;
        desenharLabirinto();
    }

    if (player.x === exit.x && player.y === exit.y) {
        finalizarFase();
    }
});

/* =======================
   FINAL
======================= */
function finalizarFase() {
    canvas.classList.add("hidden");
    endScreen.classList.remove("hidden");
}

/* =======================
   PRÓXIMA FASE
======================= */
nextPhaseBtn.addEventListener("click", () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "fase6.html";
    }, 800);
});
/* ===== SAVE AUTOMÁTICO DA FASE ===== */
if (window.SaveSystem) {
    SaveSystem.updateActivePhase(9);
} else {
    localStorage.setItem("faseAtual", 9);
} 