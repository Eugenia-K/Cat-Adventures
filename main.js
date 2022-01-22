//import { Sprite } from "./spriteAnim.js";
import { Obstacle } from "./obstacles.js";
import { Player } from "./cat.js";
//import { Game } from "./game.js";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 400;

const cat = new Image();
cat.src = 'img/cat - Copy.png';

const firstCatPositionX = 120;
const firstCatPositionY = 310;

let player = new Player({
    ctx: ctx,
    image: cat,
    width: 120,
    height: 95,
    scale: 1,
    x: firstCatPositionX,
    y: firstCatPositionY,
    numberOfFrames: 3,
    ticksPerFrame: 10,
    gravity: 0.5,
    audioSrc: 'audio/reach.m4a',
})

let GAMESPEED = 20;

const cloud = new Image();
cloud.src = 'img/Cloud.png';

let obstacle = new Obstacle({
    ctx: ctx,
    obsImage: cloud,
    obsWidth: 64,
    obsHeight: 64,
    obsScale: 1,
    obsX: RandomIntInRange(1000, 1500),
    obsY: 335,
    gameSpeed: GAMESPEED,
})

const backSound = new Audio();
backSound.src = 'audio/back.mp3';
backSound.play();
//backSound.loop;


const star = new Image();
star.src = 'img/Star.png';

let starObj = new Obstacle({
    ctx: ctx,
    obsImage: star,
    obsWidth: 32,
    obsHeight: 32,
    obsScale: 2,
    obsX: 1000,
    obsY: RandomIntInRange(150, 210),
    gameSpeed: GAMESPEED / 2,
})

/*let game = new Game({
    ctx: ctx,
    image: cat,
    width: 120,
    height: 95,
    scale: 1,
    x: firstCatPositionX,
    y: firstCatPositionY,
    numberOfFrames: 3,
    ticksPerFrame: 10,
    gravity: 0.5,
    audioSrc: 'audio/reach.m4a',

    obsImage: cloud,
    obsWidth: 64,
    obsHeight: 64,
    obsScale: 1,
    obsX: 1000,
    obsY: 335,
    gameSpeed: GS,
    backAudioSrc: 'audio/back.mp3',
    restartSrc: 'img/restart.png',
})

console.log(game.player);

game.game;*/

window.addEventListener('keydown', keyDownListener, false);

window.addEventListener('keyup', keyUpListener, false);


let gameTimeOut;
let gamePlay = true;



let obsUpdateTime = 50;
let score = 0;
let highscore = 0;
let stars = 0;

const firstObsX = 1000;
let speedScore = 200;
let plusScore = 0.1;

let obstacleTimeout = window.setInterval(obstacle.start.bind(obstacle), obsUpdateTime + RandomIntInRange(0, 15));

let starTimeout = window.setInterval(starObj.start.bind(starObj), obsUpdateTime * 2);

function drawScore() {
    const newScore = Math.round(score);
    ctx.clearRect(0, 0, 200, 100);
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + newScore, 15, 40);

    const newHighscore = Math.round(highscore);
    ctx.clearRect(800, 0, 200, 100);
    ctx.fillText("Highscore: " + newHighscore, 800, 40);

    ctx.clearRect(400, 0, 200, 100);
    ctx.fillText("Stars: " + stars, 400, 40);
}

game();

function keyDownListener(event) {
    if (event.key === 'ArrowUp') {
        //alert('Arrow Up');
        player.startJump();
    }
}

function keyUpListener(event) {
    if (event.kode === 'ArrowUp')
        player.endJump();
}

function detectCollision(object) {
    const catCollisionX = player.cat.posX + (player.cat.width * player.cat.scale);
    const catCollisionY = player.cat.posY + (player.cat.height * player.cat.scale);

    const obsCollisionX = object.posX + (object.width * object.scale);
    const obsCollisionY = object.posY + (object.height * object.scale);

    if (catCollisionX >= object.posX && catCollisionY >= object.posY && obsCollisionX >= player.cat.posX && obsCollisionY >= player.cat.posY) {
        return true;
    } else
        return false;
}


let restart = document.createElement('img');
restart.src = 'img/restart.png';


function reternToStart() {
    //alert('reternToStart');
    if (backSound.ended)
        backSound.play();
    obsUpdateTime = 50;

    starObj.firstPosX = RandomIntInRange(1000, 1200);
    starObj.PosY = RandomIntInRange(150, 210);

    obstacleTimeout = setInterval(obstacle.start.bind(obstacle), obsUpdateTime);
    starTimeout = setInterval(starObj.start.bind(starObj), obsUpdateTime * 2);

    restart.remove();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    GAMESPEED = 20;
    plusScore = 0.1;
    speedScore = 100;
    player.ticksPerFrame = 10;

    if (highscore < score)
        highscore = score;

    score = 0;
    stars = 0;

    player.cat.posY = firstCatPositionY;
    player.grounded = false;
    player.gravity = 0.5;

    obstacle.posX = firstObsX;

    gamePlay = true;

    game();

}


function game() {

    //console.log("game");
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!player.grounded)
        player.updatePosition();

    drawScore();

    if (backSound.ended)
        backSound.play();

    if (score > speedScore) {
        GAMESPEED--;
        plusScore += 0.1;
        speedScore += 200;
        player.ticksPerFrame++;
        if (obsUpdateTime > 6)
            obsUpdateTime -= 2;
    }


    if (detectCollision(obstacle)) {

        clearTimeout(gameTimeOut);
        clearInterval(obstacleTimeout);
        clearInterval(starTimeout);

        gamePlay = false;

        let divGame = document.querySelector('.game');

        divGame.appendChild(restart);
        restart.classList.add('restart');
        restart.addEventListener('click', reternToStart, true);
    } else
        score += plusScore;

    if (detectCollision(starObj)) {
        //clearInterval(starTimeout);
        stars++;
        score += 5;
        starObj.firstPosX = RandomIntInRange(1000, 1200);
        starObj.PosY = RandomIntInRange(150, 210);
        const starW = starObj.width * starObj.scale;
        const starH = starObj.height * starObj.scale;

        ctx.clearRect(starObj.posX, starObj.posY, starObj.posX + starW, starObj.posY + starH);
        starObj.posX = firstObsX;

    }




    if (gamePlay) {
        gameTimeOut = window.setTimeout(game, GAMESPEED);

    }
}

function RandomIntInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}