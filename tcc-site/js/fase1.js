document.addEventListener("DOMContentLoaded", function () {

    const falaZero = document.getElementById("falaZero");
    const btnDialogo = document.getElementById("btnDialogo");
    const desafio = document.getElementById("desafio");
    
    const codigoEl = document.getElementById("codigo");
    const preview = document.getElementById("preview");
    
    const transicao = document.getElementById("transicao");
    
    
    /* =========================
    DIÁLOGOS INICIAIS
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
    
    btnDialogo.onclick = function(){
    
    /* animação de transição */
    transicao.classList.add("ativa");
    
    /* ir para fase 2 */
    
    setTimeout(function(){
    
    window.location.href = "fase2.html";
    
    },1000);
    
    };
    
    }
    
    });