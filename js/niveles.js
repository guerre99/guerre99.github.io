
class Nivel{
    constructor(ctx,x,y,w,h){
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w * 0.9245
        this.h = h * 0.0386
    }
    draw(){
        this.ctx.rect(this.x,this.y,this.w,this.h)
    }
}