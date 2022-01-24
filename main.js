import { Game } from "./game.js";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 400;

const cat = new Image();
cat.src = 'img/cat - Copy.png';

const firstCatPositionX = 120;
const firstCatPositionY = 310;

const playerConfig = {
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
    audioSrc: 'audio/meow.mp3'
};


let GAMESPEED = 20;


const cloud = new Image();
cloud.src = 'img/Cloud.png';

const obsConfig = {
    ctx: ctx,
    image: cloud,
    width: 64,
    height: 64,
    scale: 1,
    x: RandomIntInRange(1000, 1500),
    y: 335,
    gameSpeed: 20
};

const star = new Image();
star.src = 'img/Star.png';

const starConfig = {
    ctx: ctx,
    image: star,
    width: 32,
    height: 32,
    scale: 2,
    x: 800,
    y: RandomIntInRange(150, 210),
    numberOfFrames: 13,
    ticksPerFrame: 5,
    audioSrc: 'audio/star.wav',
    gameSpeed: 20
};

let game = new Game(
    playerConfig,
    obsConfig,
    starConfig
);


function RandomIntInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


let keyDownListener;
let keyUpListener;

window.addEventListener('keydown', keyDownListener = (event) => {
    if (event.key === 'ArrowUp') {
        game.player.startJump();
    }
}, false);

window.addEventListener('keyup', keyUpListener = (event) => {
    if (event.key === 'ArrowUp')
        game.player.endJump();
}, false);


const restart = document.createElement('img');
restart.src = 'img/restart.png';

const backSound = new Audio();
backSound.src = 'audio/back.mp3';
let soundInterval;

function playSound() {

    if (backSound.paused) {

        soundButton.src = 'img/sound-on.png';
        game.player.soundOn = true;
        game.soundOn = true;

        backSound.play();

        soundInterval = setInterval(() => {
            backSound.play();
        }, 132000);

    } else {
        clearInterval(soundInterval);
        soundButton.src = 'img/sound-off.png';
        backSound.pause();
    }

}

let soundButton = document.querySelector('.sound');
console.log(soundButton.src);
soundButton.addEventListener('click', playSound, false);


function restartGame() {

    game.returnToStart();
    restart.remove();
    gameTimeOut = setTimeout(playGame, GAMESPEED);
    obstacleTimeout = setInterval(game.obstacle.start.bind(game.obstacle), obsUpdateTime);
    starTimeout = setInterval(game.starObj.updateStar.bind(game.starObj), obsUpdateTime * 2);
}

function playGame() {

    const answer = game.game();

    if (!answer) {

        clearTimeout(gameTimeOut);
        clearInterval(obstacleTimeout);
        clearInterval(starTimeout);

        obsUpdateTime = 50;
        GAMESPEED = 20;

        let insertPlace = document.querySelector('.game');
        insertPlace.appendChild(restart);
        restart.classList.add('restart');
        restart.addEventListener('click', restartGame, true);

    } else {
        if (obsUpdateTime > 6)
            obsUpdateTime -= 2;
        if (game.score > game.speedScore && GAMESPEED > 5)
            GAMESPEED--;
        gameTimeOut = setTimeout(playGame, GAMESPEED);
    }

}

let obsUpdateTime = 50;

let obstacleTimeout = setInterval(game.obstacle.start.bind(game.obstacle), obsUpdateTime + RandomIntInRange(0, 15));
let starTimeout = setInterval(game.starObj.updateStar.bind(game.starObj), obsUpdateTime * 2);
let gameTimeOut = setTimeout(playGame, GAMESPEED);
