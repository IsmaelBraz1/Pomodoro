//variáveis
let min = 24;
let seg = 60;
let tempo = 1000; 
let intervalo = 1000;
let crono;

//Função para iniciar
function start(){
    if(((min == 24) && (seg == 60)) || ((min == 0) && (seg == 0))){ //Condição para iniciar o cronômetro
        min=24;
        seg = 60;
        crono = setInterval(() => { timer(); }, tempo);
    }
}

//Função para dar pause
function pause(){
    if(((min > 0) && (min < 24)) || ((seg > 0) && (seg < 60))){//Condição para parar
        
        clearInterval(crono);

        let inserir = document.querySelector('td#bpause');
        inserir.innerHTML = '<button onclick="seguir()">Continue</button>';
    }
}

//Função para continuar
function seguir(){
    crono = setInterval(() => { timer(); }, tempo);
    let inserir = document.querySelector('td#bpause');
    inserir.innerHTML = '<button onclick="pause()">Pause</button>' ;
}

//Função para resetar
function reset(){
    clearInterval(crono);
    min = 24;
    seg = 60;
    document.getElementById('cont').innerText = '25:00';
    document.getElementById('bpause').innerHTML = '<button onclick="pause()">Pause</button>';
    document.getElementById('mudar').innerHTML = '<td id="mudar"><button onclick="intervalo_curto()">Intervalo</button></td>'
}

//Função que faz contagem
function timer(){
    seg--;
    if(seg < 0){
        min--;
        seg = 59
         
        if(min == 0){
            min = 0;
            seg = 0;
            audio = document.getElementById('audio');
            audio.play();
            clearInterval(crono);

        }
    }
    //Formato do relógio
    var format = (min < 10 ? '0' + min : min) + ':' + (seg == 60? '00' : (seg < 10 ? '0' + seg : seg))
    document.getElementById('cont').innerHTML = format;
    
}

//Função para intervalo
function intervalo_curto(){
if(((min == 24) && (seg == 60)) || ((min == 0) && (seg == 0))){
       
        min = 4;
        seg = 60;
       
        crono = setInterval(() => { timer(); }, intervalo);
        
        if(((min == 4) && (seg == 60)) || ((min == 0) && (seg == 0))){
            document.getElementById('cont').innerText = '05:00';
            document.getElementById('mudar').innerHTML = '<td><button onclick="voltar()">Pomodoro</button></td>'
        }
    }
}

//voltar do intervalo
function voltar(){
    document.getElementById('mudar').innerHTML = '<td id="mudar"><button onclick="intervalo_curto()">Intervalo</button></td>'
    reset();
    start();
}