import { Sprite } from "./spriteAnim.js";

export class Player {

    constructor(playerConfig) {

        this.cat = new Sprite(playerConfig);

        this.interactAudio = new Audio();
        this.interactAudio.src = playerConfig.audioSrc;
        this.soundOn = false;

        this.jumpVelocity = 0;
        this.gravity = playerConfig.gravity;

        this.originalHight = playerConfig.height * playerConfig.scale;
        this.groundPosition = playerConfig.y;

        this.grounded = false;

    }

    startJump() {
        //alert (this.grounded);
        if (this.grounded) {
            if (this.soundOn)
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

        this.cat.ctx.clearRect(this.cat.posX,
            this.cat.posY + 2,
            this.cat.width * this.cat.scale,
            this.cat.height * this.cat.scale);

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