// saber a altura e largura na janela
var altura
var largura
// variável que define o numero de vidas
var vidas = 1
// tempo no cornometro
var tempo = 30

// velocidade do jogo
var borboleta_tempo = 2000
var nivel = window.location.search
nivel = nivel.replace("?","")
if (nivel==="nomal") {
  borboleta_tempo = 2000

} else if (nivel==="dificil") {
  borboleta_tempo = 1200

} else if (nivel==="invasao"){
  borboleta_tempo = 750
}

// função para que o jogo seja reajustada a cada redimensionamento da janela
function ajustaTamanhoJogo() {
  altura = window.innerHeight
  largura = window.innerWidth
}
ajustaTamanhoJogo()
// colocar a função no gatilho "onresize" do body, assim será excutada toda vez que o body for redimensionado e os valores de largura e altura estarão sempre atualizados


// função cronômetro
var cronometro = setInterval(function() {
  tempo -= 1;
  
  if (tempo <= 0) {
    clearInterval(cronometro)
    clearInterval(criaborboleta)
    window.location.href = "fim_de_jogo.html?"+"vitoria"
  } else {
    document.getElementById("cronometro").innerHTML = tempo;
  }
}, 1000);



// Posição das borboletas
function posicaoRandom(){

  // remover o elemento borboleta, caso exista
  if (document.getElementById("borboleta")) {
    document.getElementById("borboleta").remove()
    
    // ação de remover vidas, caso o elemento não seja clicado pelo usuário
    if (vidas <= 3){
      document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png"
      vidas++

    } else {
      // game over
      window.location.href = "fim_de_jogo.html?"+"derrota"
     
    }
  }
  
  var posicaoX = Math.floor(Math.random() * (largura)) -120
  var posicaoY = Math.floor(Math.random() * (altura)) -120 

  // para posição não ser negativa, utiliza-se o operador ternário
  posicaoX = posicaoX < 0 ? 1 : posicaoX
  posicaoY = posicaoY < 0 ? 1 : posicaoY

  // criar elemento dentro do html
  var borboleta = document.createElement("img")
  borboleta.src = "imagens/borboleta.png"
  // atrinuir valores de classe e estilo
  borboleta.className = tamanhoAleatorio() + " " + ladoAleatorio() //chama a função para atribuir a classe
  borboleta.style.left = posicaoX + "px"
  borboleta.style.top = posicaoY + "px"
  borboleta.style.position = "absolute"
  borboleta.id = "borboleta"

  document.body.appendChild(borboleta)

  // toda vez que mudar a posição, também mudará ao tamanho e a orientação
  tamanhoAleatorio()
  ladoAleatorio()

  // incliur o atributo onclick para acionar a função do jogo
  borboleta.onclick = function(){
    this.remove() //this: o próprio elemento
  
  }

}

// Tamanho aleatorio do borboleta (1 classe para cada tamanho)
function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3)

  // alterar a classe do elemento (borboleta)
  switch(classe) {
    case 0:
      return "borboleta1"
    case 1:
      return "borboleta2"
    case 2:
      return "borboleta3"

  }
}

// Orientação Direita/Esquerda
function ladoAleatorio() {
  var classe = Math.floor(Math.random() * 2)

  switch(classe) {
    case 0:
      return "ladoA"
    case 1:
      return "ladoB"
  }
  
}