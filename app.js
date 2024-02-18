let numSecreto = 0;
let intentos = 0;
let listaNumSorteados = [];
let numMaximo = 10;

function asignarTextoElemento(elemento,texto){
    let variable = document.querySelector(elemento);
    variable.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numUsuario = parseInt(document.getElementById('valorUsuario').value);

    if(numUsuario === numSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        //El jugador se equivoca
        if (numUsuario > numSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else{
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }

    return;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto(){
    let numGenerado = Math.floor(Math.random()*numMaximo) + 1;

    //se sortearon todos los números?
    if(listaNumSorteados.length == numMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else{
        //el número está en la lista?
        if(listaNumSorteados.includes(numGenerado)){
            return generarNumeroSecreto();
        } else{
            listaNumSorteados.push(numGenerado);
            return numGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Inserte un numero entre 1 y ${numMaximo}`);
    numSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //Limpiar la caja (el input donde se pone el número)
    limpiarCaja();

    //Indicar el mensaje de inicio (el de intervalo de números)
    //Generar nuevo número aleatorio
    //Inicializar los intentos (reiniciarlos y ponerlos en 1 otra vez)
    condicionesIniciales();
    
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');

}

condicionesIniciales();