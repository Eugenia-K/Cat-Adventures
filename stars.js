import { Sprite } from './spriteAnim.js';

export class Stars {

    constructor(starConfig) {

        this.star = new Sprite(starConfig);

        this.firstPosX = starConfig.posX;

        this.dx = -(starConfig.gameSpeed);

    }


    updateStar() {

        const j = -(this.star.width * this.star.scale);

        this.star.ctx.clearRect(this.star.posX,
            this.star.posY,
            this.star.width * this.star.scale,
            this.star.height * this.star.scale);

        if (this.star.posX > j) {
            this.star.posX += this.dx;
        } else {
            this.star.posX = this.firstPosX;
        }

    }
}