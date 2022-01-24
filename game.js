import { Stars } from "./stars.js";
import { Player } from "./cat.js";
import { Obstacle } from "./obstacles.js";

export class Game {

    constructor(playerConfig, obsConfig, starConfig, options) {

        this.ctx = playerConfig.ctx;

        this.player = new Player(playerConfig);

        this.obstacle = new Obstacle(obsConfig);

        this.starObj = new Stars(starConfig);

        this.starAudio = new Audio();
        this.starAudio.src = starConfig.audioSrc;
        this.soundOn = false;

        this.score = 0;
        this.highscore = 0;
        this.stars = 0;

        this.firstCatPositionY = playerConfig.y;
        this.playerTics = playerConfig.ticksPerFrame;
        this.firstObsX = 1000;

        this.speedScore = 500;
        this.plusScore = 0.1;

        this.objDx = -starConfig.gameSpeed;

    }

    drawScore() {
        const newScore = Math.round(this.score);
        this.ctx.clearRect(0, 0, 200, 100);
        this.ctx.font = "25px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Score: " + newScore, 15, 40);

        const newHighscore = Math.round(this.highscore);
        this.ctx.clearRect(800, 0, 200, 100);
        this.ctx.fillText("Highscore: " + newHighscore, 800, 40);

        this.ctx.clearRect(400, 0, 200, 100);
        this.ctx.fillText("Stars: " + this.stars, 400, 40);
    }

    detectCollision(object) {
        const catCollisionX = this.player.cat.posX + (this.player.cat.width * this.player.cat.scale);
        const catCollisionY = this.player.cat.posY + (this.player.cat.height * this.player.cat.scale);

        const obsCollisionX = object.posX + (object.width * object.scale);
        const obsCollisionY = object.posY + (object.height * object.scale);

        if (catCollisionX >= object.posX && catCollisionY >= object.posY &&
            obsCollisionX >= this.player.cat.posX && obsCollisionY >= this.player.cat.posY) {
            return true;
        } else
            return false;
    }


    returnToStart() {

        this.starObj.firstPosX = Game.RandomIntInRange(1000, 1200);
        this.starObj.star.PosY = Game.RandomIntInRange(150, 210);
        this.starObj.star.PosX = this.starObj.firstPosX;

        this.starObj.dx = this.objDx;
        this.obstacle.dx = this.objDx;
        this.player.cat.ticksPerFrame = this.playerTics;

        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.plusScore = 0.1;
        this.speedScore = 500;
        this.player.ticksPerFrame = 10;

        if (this.highscore < this.score)
            this.highscore = this.score;

        this.score = 0;
        this.stars = 0;

        this.player.cat.posY = this.firstCatPositionY;
        this.player.grounded = false;
        this.player.gravity = 0.5;

        this.obstacle.posX = this.firstObsX;

    }

    game() {

        if (!this.player.grounded)
            this.player.updatePosition();

        this.drawScore();

        if (this.score >= this.speedScore) {

            this.plusScore += 0.1;
            this.speedScore += 500;

            if (this.player.cat.ticksPerFrame > 4)
                this.player.cat.ticksPerFrame--;

            const delta = Math.abs(Math.round(this.objDx / 4));

            if (Math.abs(this.obstacle.dx) > delta) {
                this.obstacle.dx -= 2;
            }

            if (Math.abs(this.starObj.dx) > delta) {
                this.starObj.dx--;
            }


        }

        if (this.detectCollision(this.obstacle))
            return false;

        else if (this.detectCollision(this.starObj.star)) {

            if (this.soundOn)
                this.starAudio.play();
            this.stars++;
            this.score += 10;

            const qurStar = this.starObj.star;

            this.starObj.firstPosX = Game.RandomIntInRange(1000, 1200);
            qurStar.PosY = Game.RandomIntInRange(100, 210);
            const starW = qurStar.width * qurStar.scale;
            const starH = qurStar.height * qurStar.scale;

            this.ctx.clearRect(qurStar.posX,
                qurStar.posY,
                qurStar.posX + starW,
                qurStar.posY + starH);

            qurStar.posX = this.firstObsX;

        } else
            this.score += this.plusScore;

        return true;
    }

    static RandomIntInRange(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

}