export class Obstacle {

    constructor(obsConfig) {

        this.ctx = obsConfig.ctx;

        this.image = obsConfig.image;

        this.scale = obsConfig.scale;

        this.firstPosX = obsConfig.x;

        this.posX = obsConfig.x;
        this.posY = obsConfig.y;

        this.width = obsConfig.width;
        this.height = obsConfig.height;

        this.dx = -obsConfig.gameSpeed;

    }



    drawFrame() {
        this.ctx.drawImage(this.image,
            0,
            0,
            this.width,
            this.height,
            this.posX,
            this.posY,
            this.width * this.scale,
            this.height * this.scale
        );
        //console.log ("&&&");
    }

    render() {
        //console.log ("render");
        this.ctx.clearRect(this.posX, this.posY, this.width * this.scale, this.height * this.scale);
        this.drawFrame();
    }


    update() {
        const j = -(this.width * this.scale);
        this.ctx.clearRect(this.posX, this.posY, this.width * this.scale, this.height * this.scale);
        if (this.posX > j) {
            this.posX += this.dx;
        } else {
            this.posX = this.firstPosX;
        }
    }

    start() {
        this.update();
        this.render();
    }

}