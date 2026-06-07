document.addEventListener("DOMContentLoaded", () => {

    // ===== SAVE =====
    let save = { pontos: 0 };
    try {
        if (typeof SaveSystem !== "undefined") {
            save = SaveSystem.getSave();
            SaveSystem.atualizarFase(3);
        }
    } catch {}

    // ===== ELEMENTOS =====
    const falaZero = document.getElementById("falaZero");
    const btnContinuar = document.getElementById("btnContinuar");
    const btnVoltar = document.getElementById("btnVoltar");
    const desafio = document.getElementById("desafio");
    const codigo = document.getElementById("codigo");
    const btnValidar = document.getElementById("btnValidar");
    const titulo = document.getElementById("tituloTeste");
    const proximaFase = document.getElementById("proximaFase");
    const transicao = document.getElementById("transicao");
    const cenario = document.getElementById("cenario");

    const btnAjuda = document.getElementById("btnAjuda");
    const janelaIA = document.getElementById("janelaIA");
    const fecharIA = document.getElementById("fecharIA");
    const enviarIA = document.getElementById("enviarIA");
    const inputIA = document.getElementById("inputIA");
    const chatIA = document.getElementById("chatIA");
    const topoIA = document.getElementById("topoIA");

    // ===== HISTÓRIA =====
    const falas = [
        "Conseguimos avançar… mas o mundo está sem identidade.",
        "HTML criou a estrutura, mas falta algo.",
        "CSS é a linguagem que dá estilo às páginas.",
        "Com CSS, mudamos cores e tamanhos.",
        "Vamos dar vida a esse título."
    ];

    let i = 0;
    let codigoValidado = false;
    falaZero.innerText = falas[i];

    if (proximaFase) {
        proximaFase.classList.add("oculto");
        proximaFase.disabled = true;
    }

    // garante que o minigame começa escondido
    desafio.classList.add("oculto");

    // ===== BOTÃO CONTINUAR =====
    btnContinuar.onclick = () => {

        if (i < falas.length - 1) {

            i++;
            falaZero.innerText = falas[i];

            // efeito visual no cenário
            if (i >= 2) {
                cenario.classList.add("ativo");
            }

        } else {

            // quando terminar todas as falas
            falaZero.innerText = "Agora use CSS para estilizar o título.";

            // mostra o minigame
            desafio.classList.remove("oculto");

        }

    };

    // ===== BOTÃO VOLTAR =====
    btnVoltar.onclick = () => {
        if (i > 0) {
            i--;
            falaZero.innerText = falas[i];

            // se voltar antes do final, esconde o minigame
            if (i < falas.length - 1) {
                desafio.classList.add("oculto");
            }
        }
    };

    // ===== VALIDAR CSS =====
    btnValidar.onclick = () => {

        const css = codigo.value.toLowerCase();

        const valido =
            css.includes("h1") &&
            css.includes("{") &&
            css.includes("}") &&
            css.includes("color") &&
            css.includes("font-size");

        if (valido) {

            codigoValidado = true;

            // aplica o estilo no título
            titulo.style.color = "green";
            titulo.style.fontSize = "40px";

            falaZero.innerText = "Perfeito! Agora o sistema tem identidade.";

            // mostra e habilita o botão somente após validar corretamente
            proximaFase.classList.remove("oculto");
            proximaFase.disabled = false;

        } else {

            codigoValidado = false;

            falaZero.innerText = "Algo não funcionou. Verifique o CSS.";

            // garante que continue escondido e bloqueado
            proximaFase.classList.add("oculto");
            proximaFase.disabled = true;

        }
    };

    // O botão só pode aparecer após clicar em 'Aplicar Estilo' e o código estiver correto
    // Qualquer edição no textarea esconde o botão até nova validação
    codigo.addEventListener("input", () => {
        codigoValidado = false;
        if (proximaFase) {
            proximaFase.classList.add("oculto");
            proximaFase.disabled = true;
        }
    });

    // ===== IA =====
    btnAjuda.onclick = () => {
        janelaIA.classList.remove("oculto");
    };

    fecharIA.onclick = () => {
        janelaIA.classList.add("oculto");
    };

    enviarIA.onclick = async () => {

        if (!inputIA.value.trim()) return;

        chatIA.innerHTML += `<div><b>Você:</b> ${inputIA.value}</div>`;

        try {

            const r = await fetch("../api/ia.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mensagem: inputIA.value })
            });

            const d = await r.json();

            chatIA.innerHTML += `<div><b>IA:</b> ${d.choices[0].message.content}</div>`;

        } catch {

            chatIA.innerHTML += `<div><b>IA:</b> Erro de conexão.</div>`;

        }

        chatIA.scrollTop = chatIA.scrollHeight;
        inputIA.value = "";

    };

    // ===== ARRASTAR IA =====
    let drag = false, ox = 0, oy = 0;

    topoIA.onmousedown = e => {
        drag = true;
        ox = e.clientX - janelaIA.offsetLeft;
        oy = e.clientY - janelaIA.offsetTop;
    };

    document.onmousemove = e => {
        if (drag) {
            janelaIA.style.left = e.clientX - ox + "px";
            janelaIA.style.top = e.clientY - oy + "px";
        }
    };

    document.onmouseup = () => drag = false;

    // ===== TRANSIÇÃO =====
    const somTransicao = new Audio("../audio/transition.wav");

    proximaFase.onclick = () => {
        if (!codigoValidado) {
            falaZero.innerText = "Valide um código CSS correto para liberar a próxima fase.";
            proximaFase.classList.add("oculto");
            proximaFase.disabled = true;
            return;
        }

        try {
            SaveSystem.atualizarFase(4);
        } catch {}

        somTransicao.play();

        transicao.classList.add("ativa");

        setTimeout(() => {
            window.location.href = "fase4.html";
        }, 1000);

    };

    // ===== SAVE LOCAL =====
    if (window.SaveSystem) {
        SaveSystem.updateActivePhase(3);
    } else {
        localStorage.setItem("faseAtual", 3);
    }

});
