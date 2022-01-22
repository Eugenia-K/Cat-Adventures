export class Obstacle {

    constructor(options) {

        //this.obs = new Sprite (options);

        this.ctx = options.ctx;

        this.image = options.obsImage;

        this.scale = options.obsScale;

        this.firstPosX = options.obsX;

        this.posX = options.obsX;
        this.posY = options.obsY;

        this.width = options.obsWidth;
        this.height = options.obsHeight;

        //this.gameS = -options.gameSpeed;
        this.dx = -options.gameSpeed;

        //this.start();

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
        //console.log ("update");
        const j = -(this.width * this.scale);
        this.ctx.clearRect(this.posX, this.posY, this.width * this.scale, this.height * this.scale);
        if (this.posX > j) {
            this.posX += this.dx;
        } else {
            this.posX = this.firstPosX;
        }
    }

    start() {
        //console.log(this.posX, "obs - position");
        this.update();
        this.render();
    }

}

/*let canvas = document.getElementById('canvas');
  canvas.width = 1000;
  canvas.height = 400;
  
  const spriteImage = new Image();
  spriteImage.src = 'img/Cloud.png';
  
  let im = new Obstacle({
    ctx: canvas.getContext('2d'),
    image: spriteImage,
    width: 64,
    height: 64,
    scale: 1,
    x: 950,
    y: 335,
    numberOfFrames: 1,
    ticksPerFrame: 10,
    gameSpeed:10,
  })

setInterval(im.start.bind(im), 30);*/

//console.log (im);