const closemensagem = document.querySelector('#close');
const mensagem = document.querySelector('#mensagem');

closemensagem.addEventListener("click", function (){
    mensagem.style.display = "none";
});

setTimeout(() => {
    mensagem.style.display = "none";
}, 5000);