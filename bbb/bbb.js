
const infoPop = document.querySelector('.info_pop');
const init = document.querySelector('.init');
const fechar = document.querySelector('.fechar');
const main = document.querySelector('.main');
const continuar = document.querySelector('.continuar');
const quizSec1 = document.querySelector('.quiz-sec1');
const caixa1 = document.querySelector('.caixa1');
const caixaResultado = document.querySelector('.caixa-resultado1');
const retorno = document.querySelector('.tenteNovamente');
const voltar = document.querySelector('.voltarInit');




// aqui também adicionarei anotações sobre o funcionamento das coisas 
// vamos atribuir a característica active para ativar e desativar valores de opacidade


init.onclick = () =>{
    infoPop.classList.add('active');
    main.classList.add('active');
    
}

// mais fácil do que trabalhar com valores de flex e block, ative e none, melhor utilizar values para opacidade.

fechar.onclick = () =>{
    infoPop.classList.remove('active');
    main.classList.remove('active');
    location.href = '/main/teste.html'
    
}

continuar.onclick = () => {
    quizSec1.classList.add('active');
    infoPop.classList.remove('active');
    main.classList.remove('active');
    caixa1.classList.add('active');

    mostrarPerguntas(0);
    contadorPerguntas(1);
    pontuacao1();


}


voltar.onclick = () =>{
    quizSec1.classList.remove('active');
    continuar.classList.remove('active');
    caixaResultado.classList.remove('active');
    location.href = '/main/teste.html'

    
 contPerg = 0; // Contador para o número de cada pergunta
 pergNum = 1;
 pontUsuario = 0;
 mostrarPerguntas(contPerg);
 contadorPerguntas(pergNum);
    
  
}


let contPerg = 0; // Contador para o número de cada pergunta
let pergNum = 1;
let pontUsuario = 0;

const prox = document.querySelector('.prox');

prox.onclick = () => {
    if (contPerg < perguntas1.length - 1) { //lengh dá uma propriedade específica ao elemento que estamos trabalhando
        contPerg++;
        mostrarPerguntas(contPerg);

        pergNum++;
        contadorPerguntas(pergNum);
    }
    else {
        console.log("Quiz finalizado");
        mostrarResultado();
    }
        
}



//aqui a magia irá começar. aqui vamos poder pegar as perguntas da outra lista e incluir no html

function mostrarPerguntas(index) {
    
    const pergunt1 = document.querySelector('.perguntas1');
    pergunt1.textContent = `${perguntas1[index].num}. ${perguntas1[index].pergunta}`; //vai puxar as informações do perguntas 1 

  let opTag1 = `<div class="respostas1">${perguntas1[index].opt[0]}</span></div>
                <div class="respostas1">${perguntas1[index].opt[1]}</span></div>
                <div class="respostas1">${perguntas1[index].opt[2]}</span></div>
                <div class="respostas1">${perguntas1[index].opt[3]}</span></div>`;


    
    const optLista1 = document.querySelector('.opt1'); //

    optLista1.innerHTML = opTag1;

    const resp1Certa = document.querySelectorAll('.respostas1'); // resposta certa do Array de respostas 1

    for (let i=0; i < resp1Certa.length; i++){
        resp1Certa[i].setAttribute('onclick', 'opcaoSelecionada(this)')
    }

}

function opcaoSelecionada(resposta) {
    let resp1Usuario = resposta.textContent;
    let resposta1Correta = perguntas1[contPerg].resposta;
    const optLista1 = document.querySelector('.opt1');  
    
    console.log(resposta1Correta); console.log(resp1Usuario);

    if (resposta1Correta == resp1Usuario) {
        console.log("Você acertou!");
        resposta.classList.add('correta');
        pontUsuario+= 10;
        pontuacao1();

        let todasResp1 = optLista1.children.length;
        for (let i=0; i < todasResp1; i++) {
            if (optLista1.children[i].textContent == resposta1Correta){
              optLista1.children[i].setAttribute('class', 'respostas1 correta');
            }



        }

        for (let i=0; i < todasResp1; i++) {
            optLista1.children[i].classList.add('desativado');
           }
        
    }
    else {
        console.log("Você errou!");
        resposta.classList.add('errada');
        pontUsuario-=5;
        pontuacao1();

        let todasResp1 = optLista1.children.length;
        for (let i=0; i < todasResp1; i++) {
            if (optLista1.children[i].textContent == resposta1Correta){
              optLista1.children[i].setAttribute('class', 'respostas1 correta');
            }

        }

        for (let i=0; i < todasResp1; i++) {
            optLista1.children[i].classList.add('desativado');
           }

         
    }

        
    

    // child significa um elemento do html que pertence ou descende diretamente d eum outro elemento ou classe
    // vamos desativar as opções caso o amigo erre a pergunta.

   
   

} 







function contadorPerguntas(index) {
    const totalPerg = document.querySelector(".total1"); //o index serve para quando estamos trabalhando com arrays, ele pega o número do índice
    totalPerg.innerHTML = `${index} de ${perguntas1.length} Perguntas`;
}

function pontuacao1() { //aqui incluiremos a pontuação do usuario
    const pontText1 = document.querySelector('.pontos1');
    pontText1.textContent = `Pontuação: ${pontUsuario} / ${(perguntas1.length)*10}`;
}

function mostrarResultado() {
    caixa1.classList.remove('active');
    caixaResultado.classList.add('active');

    const pontuacaoTexto = document.querySelector('.texto_pontuacao');
    pontuacaoTexto.textContent = `Você obteve ${pontUsuario} / ${(perguntas1.length)*10}`;

    const circuloPorcentagem = document.querySelector('.progresso-circ1');
    const valorPorcentagem = document.querySelector('.porcentagem1');
    let valorInicialPorcentagem = 0;

 
    let valorFinalPorcentagem = (pontUsuario / (perguntas1.length*10)) * 100;
       

    let speed = 20; //não entendi direito o que é esse speed, provavelmente o valor de uma animação

    let porcentagem = setInterval(() => {
        
        valorInicialPorcentagem++;

        //console.log(valorInicialPorcentagem);
        valorPorcentagem.textContent = `${valorFinalPorcentagem}%`
       
    
        circuloPorcentagem.style.background = `conic-gradient(#ff4ec7 ${valorInicialPorcentagem * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        retorno.onclick = () => {
            caixa1.classList.add('active');
            continuar.classList.remove('active');
            caixaResultado.classList.remove('active');
        
            
         contPerg = 0; // Contador para o número de cada pergunta
         pergNum = 1;
         pontUsuario = 0;
         mostrarPerguntas(contPerg);
         contadorPerguntas(pergNum);
            
         pontuacao1();
         
            const circuloPorcentagem = document.querySelector('.progresso-circ1');
            const valorPorcentagem = document.querySelector('.porcentagem1');
            valorInicialPorcentagem = 0;
            valorFinalPorcentagem = 0;
            valorPorcentagem.textContent = `0%`;
            circuloPorcentagem.style.background = `conic-gradient(#0028aa 0deg, rgba(255, 255, 255, .1) 0deg)`;
        }
        
        

        if (valorInicialPorcentagem == valorFinalPorcentagem) {
            clearInterval(porcentagem);
        }

    }, speed);
}

