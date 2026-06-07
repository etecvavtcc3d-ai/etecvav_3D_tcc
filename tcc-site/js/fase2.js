document.addEventListener("DOMContentLoaded", function () {

    console.log("fase2.js iniciado com segurança");

    /* =========================
       SISTEMA DE SAVE (PROTEGIDO)
    ========================== */

    let save = { pontos: 0, fase2Completa: false };

    try {
        if (typeof SaveSystem !== "undefined") {
            save = SaveSystem.getSave();
            SaveSystem.atualizarFase(2);
        }
    } catch (e) {
        console.warn("SaveSystem não disponível.");
    }

    const pontosSpan = document.getElementById("pontos");
    if (pontosSpan) pontosSpan.innerText = save.pontos;

    /* =========================
       ELEMENTOS (SEGUROS)
    ========================== */

    const falaZero = document.getElementById("falaZero");
    const btnContinuar = document.getElementById("btnContinuar");
    const desafio = document.getElementById("desafio");
    const btnValidar = document.getElementById("btnValidar");
    const codigo = document.getElementById("codigo");
    const proximaFase = document.getElementById("proximaFase");
    const mensagemAcerto = document.getElementById("mensagemAcerto");
    const btnAjuda = document.getElementById("btnAjuda");
    const transicao = document.getElementById("transicao");

    /* =========================
       DIÁLOGO
    ========================== */

    const falas = [
        "Você chegou até aqui usando o que aprendeu.",
        "Agora junte isso com o que expliquei.",
        "Precisamos organizar o código corretamente.",
        "Use as tags da colinha para liberar o acesso."
    ];

    let i = 0;

    if (falaZero) falaZero.innerText = falas[i];

    if (btnContinuar) {
        btnContinuar.addEventListener("click", function () {

            i++;

            if (i < falas.length) {
                falaZero.innerText = falas[i];
            } else {
                const dialogo = document.getElementById("dialogo");
                if (dialogo) dialogo.classList.add("oculto");
                if (desafio) desafio.classList.remove("oculto");
            }

        });
    }

    /* =========================
       VALIDAÇÃO DO CÓDIGO
    ========================== */

    if (btnValidar && codigo) {

        btnValidar.addEventListener("click", function () {

            // Remove espaços extras, quebras de linha e converte para minúsculo para facilitar a validação
            const texto = codigo.value.replace(/\s+/g, '').toLowerCase();

            const tagsObrigatorias = [
                "<html>", "</html>",
                "<body>", "</body>",
                "<h1>", "</h1>",
                "<p>", "</p>"
            ];


            // Verifica se todas as tags obrigatórias estão presentes
            const contemTags = tagsObrigatorias.every(tag => texto.includes(tag));

            // Considera correto se todas as tags obrigatórias estão presentes
            if (contemTags) {

                if (!save.fase2Completa) {
                    try {
                        if (typeof SaveSystem !== "undefined") {
                            SaveSystem.adicionarPontos(10);
                            SaveSystem.marcarFaseCompleta(2);
                            save = SaveSystem.getSave();
                            if (pontosSpan)
                                pontosSpan.innerText = save.pontos;
                        }
                    } catch (e) {
                        console.warn("Erro ao salvar pontos.");
                    }
                }

                if (mensagemAcerto)
                    mensagemAcerto.classList.remove("oculto");

                if (proximaFase)
                    proximaFase.classList.remove("oculto");

            } else {

                if (mensagemAcerto)
                    mensagemAcerto.classList.add("oculto");

                if (proximaFase)
                    proximaFase.classList.add("oculto");

                alert("Código incorreto. Verifique as tags.");

            }

        });
    }

    /* =========================
       PRÓXIMA FASE
    ========================== */

    if (proximaFase) {

        proximaFase.addEventListener("click", function () {

            try {
                if (typeof SaveSystem !== "undefined") {
                    SaveSystem.atualizarFase(3);
                }
            } catch (e) {}

            if (transicao) transicao.classList.add("ativa");

            setTimeout(function () {
                window.location.href = "fase3.html";
            }, 1000);

        });

    }

    /* =========================
       SISTEMA DE AJUDA (SEGURO)
    ========================== */

    if (btnAjuda) {

        btnAjuda.addEventListener("click", function () {

            if (document.getElementById("janelaIA")) return;

            const janela = document.createElement("div");
            janela.id = "janelaIA";

            janela.style.position = "fixed";
            janela.style.top = "150px";
            janela.style.left = "150px";
            janela.style.width = "320px";
            janela.style.background = "#001a10";
            janela.style.border = "2px solid #00ff88";
            janela.style.zIndex = "9999";

            janela.innerHTML = `
                <div id="topoIA" style="padding:8px; cursor:move; display:flex; justify-content:space-between; border-bottom:1px solid #00ff88;">
                    HELP.exe
                    <button id="fecharIA" style="background:none;border:1px solid #00ff88;color:#00ff88;cursor:pointer;">X</button>
                </div>

                <div id="chatIA" style="padding:10px; height:150px; overflow-y:auto; font-size:14px;">
                    <div>Olá! Pergunte algo sobre HTML.</div>
                </div>

                <div style="display:flex; gap:5px; padding:10px;">
                    <input id="inputIA" style="flex:1; background:black; color:#00ff88; border:1px solid #00ff88;">
                    <button id="enviarIA" style="background:none;border:1px solid #00ff88;color:#00ff88;cursor:pointer;">Enviar</button>
                </div>
            `;

            document.body.appendChild(janela);

            const fecharIA = document.getElementById("fecharIA");
            const enviarIA = document.getElementById("enviarIA");
            const inputIA = document.getElementById("inputIA");
            const chatIA = document.getElementById("chatIA");
            const topoIA = document.getElementById("topoIA");

            if (fecharIA) {
                fecharIA.onclick = () => janela.remove();
            }

            if (enviarIA && inputIA && chatIA) {

                enviarIA.onclick = function () {

                    const pergunta = inputIA.value.toLowerCase();
                    if (!pergunta) return;

                    chatIA.innerHTML += `<div>> ${inputIA.value}</div>`;

                    let resposta =
                        "Use as tags da colinha para montar o código.";

                    if (pergunta.includes("html"))
                        resposta = "HTML estrutura a página.";

                    if (pergunta.includes("body"))
                        resposta = "Body contém o conteúdo visível.";

                    if (pergunta.includes("h1"))
                        resposta = "H1 é o título principal.";

                    if (pergunta.includes("p"))
                        resposta = "P cria parágrafos.";

                    chatIA.innerHTML += `<div>${resposta}</div>`;
                    chatIA.scrollTop = chatIA.scrollHeight;

                    inputIA.value = "";
                };
            }

            // Arrastar janela
            if (topoIA) {

                let arrastando = false;
                let offsetX = 0;
                let offsetY = 0;

                topoIA.onmousedown = function (e) {
                    arrastando = true;
                    offsetX = e.clientX - janela.offsetLeft;
                    offsetY = e.clientY - janela.offsetTop;
                };

                document.onmousemove = function (e) {
                    if (arrastando) {
                        janela.style.left =
                            e.clientX - offsetX + "px";
                        janela.style.top =
                            e.clientY - offsetY + "px";
                    }
                };

                document.onmouseup = function () {
                    arrastando = false;
                };
            }

        });

    }

});
if (codigoCorreto) {

    zeroFala("Código aceito. A porta está se abrindo!");

    // resto da lógica (pontos, próxima fase etc)
}
else {
    zeroFala("Hmm... algo está errado. Verifique se todas as tags estão corretas.");
}
function responderIA(pergunta) {

    pergunta = pergunta.toLowerCase();

    if (pergunta.includes("html")) {
        return "HTML é a linguagem que estrutura a página. Ele organiza o conteúdo.";
    }

    if (pergunta.includes("body")) {
        return "A tag body guarda tudo que aparece na tela.";
    }

    if (pergunta.includes("h1")) {
        return "H1 é o título principal da página.";
    }

    if (pergunta.includes("erro")) {
        return "Verifique se todas as tags estão abertas e fechadas corretamente.";
    }

    return "Tente revisar a colinha ou perguntar sobre uma tag específica.";
}
btnAjuda.addEventListener("click", () => {
    zeroFala("Essa assistente usa inteligência artificial real. Use com sabedoria.");

});
zeroFala("Vamos continuar. O código depende de você.");
async function perguntarIA(pergunta) {

    const respostaBox = document.getElementById("assistantMessages");

    respostaBox.innerHTML += `<div><b>Você:</b> ${pergunta}</div>`;

    try {
        const response = await fetch("../api/ia.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensagem: pergunta })
        });

        const data = await response.json();
        const textoIA = data.choices[0].message.content;

        respostaBox.innerHTML += `<div><b>IA:</b> ${textoIA}</div>`;
        respostaBox.scrollTop = respostaBox.scrollHeight;

    } catch (erro) {
        respostaBox.innerHTML += `<div><b>IA:</b> Erro ao conectar com o servidor.</div>`;
    }
}
sendAssistant.onclick = () => {
    const input = document.getElementById("assistantInput");
    if (!input.value.trim()) return;

    perguntarIA(input.value);
    input.value = "";
};
/* ===== SAVE AUTOMÁTICO DA FASE ===== */
if (window.SaveSystem) {
    SaveSystem.updateActivePhase(2);
} else {
    localStorage.setItem("faseAtual", 2);
} 