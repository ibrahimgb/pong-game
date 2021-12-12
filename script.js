import Ball from "./Ball.js"
import Paddle from "./Paddle.js"
 
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("playerPaddle"));
const computerPaddle = new Paddle(document.getElementById("computerPaddle"));

const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");

let previousTime ;
let update = (time)=>{

    if(previousTime != null){
        const delta = time - previousTime;
        ball.update(delta , [ playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta , ball.y);
        
    }

    if(isLose()){
        handleLose();
    }
    
    previousTime = time;
    window.requestAnimationFrame(update);
}


function handleLose(){
    const rect = ball.rect();
    if(rect.right>= window.innerWidth){
        playerScore.innerText = parseInt(playerScore.innerText)+1;
    }else{
        computerScore.innerText = parseInt(computerScore.innerText)+1; 
    }
    ball.reset();
    computerPaddle.reset();
}


function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

document.addEventListener("mousemove", e=>{
    playerPaddle.position = (e.y / window.innerHeight) * 100;
    //console.log(e.y);
})


window.requestAnimationFrame(update)
