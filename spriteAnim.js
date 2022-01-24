export class Sprite {

    constructor(options) {
        this.ctx = options.ctx;

        this.image = options.image;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;
        this.scale = options.scale;

        this.posX = options.x;
        this.posY = options.y;

        this.width = options.width;
        this.height = options.height;

        this.start();
    }

    drawFrame() {
        this.ctx.drawImage(this.image,
            this.frameIndex * this.width,
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
        this.ctx.clearRect(this.posX, this.posY, this.width * this.scale, this.height * this.scale);
        this.drawFrame();
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    }



    start() {
        //console.log("Start");
        let loop = () => {
            this.update();
            this.render();

            window.requestAnimationFrame(loop);
        }

        window.requestAnimationFrame(loop);
    }
}
