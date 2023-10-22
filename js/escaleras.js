class Escaleras{
    constructor(ctx,x,y,w,h){
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.img = new Image()

        this.img.src = 'assets/escalera.png'
    }
    draw(){
        this.ctx.drawImage(this.img,this.x,this.y,this.w,this.h)
    }
}