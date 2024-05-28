let listaNumeroSorteado = [];
let numeroMaximo = 10;
let numeroJogadas = 4;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

function apresentarTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
    apresentarTextoNaTela('h1','Jogo do número secreto');
    apresentarTextoNaTela('p', `Escolha um número de 1 à ${numeroMaximo}`);
}

reiniciarJogo();

function verificarChute(){
    let chute = document.querySelector('input').value;    
    let palavraTentativa = tentativas == 1 ? "Tentativa" : "Tentativas";
    let mensagemTentativa = `Você precisou de ${tentativas} ${palavraTentativa} para acertar`;

    if(chute == numeroAleatorio){
        apresentarTextoNaTela('h1', 'Acertou!');
        apresentarTextoNaTela('p', mensagemTentativa);
        limparCampo();
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        if(chute > numeroAleatorio){
            apresentarTextoNaTela('h1', 'Você errou!');
            apresentarTextoNaTela('p', 'O número é secreto é menor');
        }else{
            apresentarTextoNaTela('h1', 'Você errou!');
            apresentarTextoNaTela('p', 'O número é secreto é maior');
        }
        limparCampo();
        tentativas++;
    }
}

function limparCampo(){
    let limpar = document.querySelector('input');
    limpar.value = '';
}

function gerarNumeroAleatorio(){
    let numeroSorteado = parseInt(Math.random() * numeroJogadas + 1);
    let numeroLimiteDaLista = listaNumeroSorteado.length;
    
    if(numeroLimiteDaLista == numeroJogadas){
        listaNumeroSorteado = [];
    }

    if(listaNumeroSorteado.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    }else{
        listaNumeroSorteado.push(numeroSorteado);
        console.log(listaNumeroSorteado);
        return numeroSorteado;
    }
}

function reiniciarJogo(){
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;    
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}