class Peach{
    constructor(ctx,canvasW,canvasH){
        this.ctx = ctx
        this.canvasW = canvasW
        this.canvasH = canvasH

        this.x = this.canvasW - this.canvasW * 0.61
        this.y = this.canvasH * 0.095 - 24
        this.w = 36
        this.h = 24

        this.img = new Image()
        this.img.src = 'assets/peach.png'
        this.img.frames = 4
        this.img.frameIndex = 0
    }

    draw(frameCounter){
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * (this.img.width / this.img.frames),
            0,
            this.img.width / this.img.frames,
			this.img.height,
            this.x,
			this.y,
			this.w,
			this.h
        )
        this.animateSprite(frameCounter)
    }

    animateSprite(frameCounter) {
		if (frameCounter % 10 === 0) {
			this.img.frameIndex++

			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
		}
	}
}