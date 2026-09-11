document.addEventListener("DOMContentLoaded", function () {

    const abertura = document.getElementById("abertura");
    const falaAbertura = document.getElementById("falaAbertura");
    const falaZero = document.getElementById("falaZero");
    const btnDialogo = document.getElementById("btnDialogo");
    const desafio = document.getElementById("desafio");
    
    const codigoEl = document.getElementById("codigo");
    const preview = document.getElementById("preview");
    
    const transicao = document.getElementById("transicao");
    
    
    document.body.classList.add("intro-ativa");

    const falasAbertura = [
        "...",
        "Onde eu estou?",
        "Não consigo me lembrar de nada...",
        "Preciso descobrir o que aconteceu aqui."
    ];

    let falaAtual = 0;

    function mostrarFalaAbertura() {
        falaAbertura.classList.remove("fala-trocando");
        void falaAbertura.offsetWidth;
        falaAbertura.classList.add("fala-trocando");
        falaAbertura.textContent = falasAbertura[falaAtual];
    }

    mostrarFalaAbertura();

    const intervaloAbertura = setInterval(function () {
        falaAtual++;
        if (falaAtual >= falasAbertura.length) {
            clearInterval(intervaloAbertura);
            setTimeout(function () {
                abertura.classList.add("encerrada");
                document.body.classList.remove("intro-ativa");
            }, 1400);
            return;
        }
        mostrarFalaAbertura();
    }, 2800);
    
    /* =========================
    DIÁLOGOS DA FASE
    ========================= */
    
    const falas = [
    "Alerta... conexão externa detectada.",
    "Você consegue me ouvir?",
    "Meu nome é Zero.",
    "Estou preso dentro deste servidor desde 1998.",
    "A porta responde apenas a código HTML.",
    "Se a estrutura estiver correta... ela se abre.",
    "Digite a estrutura HTML completa."
    ];
    
    let indice = 0;
    
    falaZero.innerText = falas[indice];
    
    btnDialogo.addEventListener("click", avancarDialogo);
    
    function avancarDialogo(){
    
    indice++;
    
    if(indice < falas.length){
    
    falaZero.innerText = falas[indice];
    
    }else{
    
    btnDialogo.style.display = "none";
    desafio.classList.remove("oculto");
    
    falaZero.innerText = "Use as tags <html>, <body> e <h1>.";
    
    }
    
    }
    
    
    /* =========================
    VERIFICAR CÓDIGO
    ========================= */
    
    window.verificarCodigo = function(){
    
    const codigo = codigoEl.value;
    
    preview.srcdoc = codigo;
    
    const correto =
    codigo.includes("<html>") &&
    codigo.includes("</html>") &&
    codigo.includes("<body>") &&
    codigo.includes("</body>") &&
    codigo.includes("<h1>") &&
    codigo.includes("</h1>");
    
    if(correto){
    
    iniciarDialogoVitoria();
    
    }else{
    
    falaZero.innerText =
    "Erro detectado. Verifique se todas as tags estão fechadas.";
    
    }
    
    };
    
    
    /* =========================
    VITÓRIA
    ========================= */
    
    function iniciarDialogoVitoria(){
    
    falaZero.innerText = "Você conseguiu abrir a primeira porta.";
    
    btnDialogo.style.display = "inline-block";
    btnDialogo.innerText = "Continuar";
    
    btnDialogo.onclick = async function(){
    
    /* animação de transição */
    transicao.classList.add("ativa");
    
    /* ir para fase 2 */
    
    if (window.SaveSystem) await SaveSystem.updateActivePhase(2);
    else localStorage.setItem("faseAtual", "2");

    setTimeout(function(){
    window.location.href = "lobby.html";
    
    },1000);
    
    };
    
    }
    
    });
