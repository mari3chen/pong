
let canvas = document.querySelector ('canvas')


canvas.style.backgroundColor = "black"
let ctx = canvas.getContext ('2d')

let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')


let gameOver = false;
let intervalId = null;
let circleX = 100,circleY = 80, radius =20
let incrX = 3, incrY = 3
let factor = 1;

let paddleX = 200, paddleWidth = 150, paddleHeight = 20
let isLeft = false, isRight = false 
let score = 0; 


setInterval(() => {
    incrX = incrX *1.03
    incrY = incrY*1.03
    factor = factor*1.01
}, 1000)



function drawCircle(){
   ctx.beginPath()
   ctx.fillStyle = 'yellow'
   ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI)
   ctx.fill()
   ctx.closePath()
}

function drawPaddle(){
ctx.beginPath()
ctx.fillRect(paddleX, canvas.height -paddleHeight, paddleWidth, paddleHeight)
ctx.closePath()
}

function collision() {
    if (circleX + radius > canvas.width){    
            incrX = -incrX     
        }
      
        if (circleY + radius > canvas.height) {
        
      
           if (circleX > paddleX && circleX < paddleX + paddleWidth ) {
              incrY = - incrY
              score++
      
           }
          else {
            gameOver = true
          }
      
        }
      
      
        if (circleX - radius < 0) {
        incrX = -incrX     
        }
      
        if (circleY - radius < 0) {
        incrY = -incrY
          }
        
      }

function animate (){
   
   ctx.clearRect(0,0,canvas.width,canvas.height)

   ctx.fillStyle = "white"    
   ctx.font = "24px Verdana"
   ctx.fillText(` Score: ${score}`, 30, 30) 
 
   drawCircle()
   circleX = circleX + incrX
   circleY = circleY +incrY

   if(isRight && paddleX + paddleWidth < canvas.width){
    paddleX = paddleX + (10*factor) 
   }
  if(isLeft && paddleX > 0){   
   paddleX = paddleX - (10*factor)
 }
   drawPaddle()


   collision()


    if(gameOver){
        cancelAnimationFrame(intervalId)
        canvas.style.display = "none"  
        restartBtn.style.display = "block"  
    }
    else {
        intervalId =requestAnimationFrame(animate)
    }
}


function start(){
    canvas.style.display = 'block'
    restartBtn.style.display = 'none'
    startBtn.style.display = 'none'
    animate()

}


window.addEventListener('load', () => {
    canvas.style.display = 'none'
    restartBtn.style.display = 'none'

   
    document.addEventListener("keydown",(event) => {
        if (event.code == "ArrowRight") { 
            isRight = true 
            isLeft = false
        }

        if (event.code == "ArrowLeft") {  
            isLeft = true
        } 
    })

    document.addEventListener('keyup', ()=> {  
        isRight = false                      
        isLeft = false

    })



    startBtn.addEventListener('click', () => {
        start()

        
    })
    restartBtn.addEventListener('click', () => {
   
        gameOver = false;
        circleX = 50;
        circleY = 50;
        score = 0;
        start ()
})
})




