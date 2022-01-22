import { Sprite } from "./spriteAnim.js";

export class Player {

    constructor(options) {

        this.cat = new Sprite(options);

        this.interactAudio = new Audio();
        this.interactAudio.src = options.audioSrc;

        this.jumpVelocity = 0;
        this.gravity = options.gravity;

        this.originalHight = options.height * options.scale;
        this.groundPosition = options.y;

        this.grounded = false;

    }

    startJump() {
        //alert (this.grounded);
        if (this.grounded) {
            this.interactAudio.play();
            this.grounded = false;
            this.jumpVelocity = -15;
        }
    }

    endJump() {
        if (this.jumpVelocity < -6)
            this.jumpVelocity = -6;
    }

    updatePosition() {
        //console.log (this.groundPosition, " - ground position");
        //console.log (this.jumpVelocity, " - Velocity");
        this.cat.ctx.clearRect(this.cat.posX, this.cat.posY + 2, this.cat.width * this.cat.scale, this.cat.height * this.cat.scale);
        this.jumpVelocity += this.gravity;
        this.cat.posY += this.jumpVelocity;

        if (this.cat.posY > this.groundPosition) {

            this.cat.posY = this.groundPosition;
            this.jumpVelocity = 0;
            this.grounded = true;
        }
        //console.log (this.cat.posY, "cat - new pos");
    }
}