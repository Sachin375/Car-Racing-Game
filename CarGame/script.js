const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let carCrash = new Audio("music/carCrash.mp3");
let carSound = new Audio("music/car.mp3");
carSound.loop = true;

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
startScreen.addEventListener("click", start);



let player = {score: 0};


let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft:  false,
    ArrowRight: false
}
console.log(keys);

function keyDown(e){
keys[e.key] = true;

}

function keyUp(e){
keys[e.key] = false;

}

function isCollide(a, b){
aRect = a.getBoundingClientRect();
bRect = b.getBoundingClientRect();
return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}
let lineSpeed = .4;
let speed = .5;
setInterval(function(){
  speed += .1;
  lineSpeed += .1;
},5000)

function moveLines(){
 let lines = document.querySelectorAll(".lines");
   lines.forEach(function(item){
    if(item.y >= 100){
        item.y = 0;
    }

    item.y += lineSpeed; 
    item.style.top = item.y + "%";

   }) 
}
function endGame(){
    carSound.pause();
  carCrash.play();
  player.start = false; 
  startScreen.classList.remove("hide");
  startScreen.innerHTML = "ReStart";
}


function moveEnemy(car){
    let enemy = document.querySelectorAll(".enemy");
      enemy.forEach(function(item){
 if(isCollide(car, item)){
 // console.log("boom");
  endGame();
 }



       if(item.y >= 100){
        let r1 = Math.floor(Math.random() * (255 - 0) + 0);
        let r2 = Math.floor(Math.random() * (255 - 0) + 0);
        let r3 = Math.floor(Math.random() * (255 - 0) + 0);
        item.style.backgroundColor = `rgb(${r1}, ${r2}, ${r3})`;
           item.y = -5;
           let v = Math.floor(Math.random() * (85 - 0) + 0);
           //console.log(v);
           item.style.left = v + "%";
       }
    
       item.y += speed; 
       console.log(item.y);
       item.style.top = item.y + "%";
      }) 
   }
function gamePlay(){
   // console.log("start ho hya");
    let car = document.querySelector(".car");
   // let road = gameArea.getBoundingClientRect();
  //  console.log(road);
    if(player.start){
       moveLines();
       moveEnemy(car);
  // console.log(player.y);
         if(keys.ArrowUp && player.y >(20)){
            player.y -= 1;
           
        }
        if(keys.ArrowDown && player.y < (90)){
            player.y += 1;
        }
        if(keys.ArrowLeft && player.x >0){
            player.x -= 2.2;
        }
        if(keys.ArrowRight && player.x < 87){
            player.x += 2.2;
        }
        car.style.top = player.y + "%";
        car.style.left = player.x + "%";
        window.requestAnimationFrame(gamePlay);
        player.score++
        score.innerHTML = "Score =  " + player.score;
    }
}
function start(){
    speed = .5;
    lineSpeed = .4; 
    carSound.play();
 startScreen.classList.add("hide");
 gameArea.innerHTML = "";
  player.start = true;
  player.score = 0;
    window.requestAnimationFrame(gamePlay);

for(let x = 0; x<5; x++){
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    //roadLine.y = (x*350);
    roadLine.y = 50*x;
    console.log(roadLine.y);
    roadLine.style.top = roadLine.y + "%";
    gameArea.append(roadLine);
}


    let car = document.createElement("div");
    car.setAttribute("class", "car");
   // car.innerHTML = "hi my name is sachin";
    gameArea.append(car);
  let totalLength =   gameArea.offsetHeight;
  let totalWidth = gameArea.offsetWidth;
  
  let top = (car.offsetTop/totalLength)*100;
  let left = (car.offsetLeft/totalWidth)*100;
    player.y = top;
    player.x = left;
    //player.y = car.offsetTop;
    // console.log("top position "+car.offsetTop);
    // console.log("left position "+car.offsetLeft);

    for(let x = 0; x<3; x++){
        let enemyCar = document.createElement("div");
        enemyCar.setAttribute("class", "enemy");


        enemyCar.y = ((x+1)*30)*-1;
        //enemyCar.y = (x+1)*10*-1;
        enemyCar.style.top = enemyCar.y + "px";


        let v = Math.floor(Math.random() * (85 - 0) + 0);
        enemyCar.style.left = v + "%";
        let r1 = Math.floor(Math.random() * (255 - 0) + 0);
        let r2 = Math.floor(Math.random() * (255 - 0) + 0);
        let r3 = Math.floor(Math.random() * (255 - 0) + 0);
        enemyCar.style.backgroundColor = `rgb(${r1}, ${r2}, ${r3})`;
        gameArea.append(enemyCar);
    }
}
