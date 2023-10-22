class DonkeyKong {
    constructor(ctx,canvasW,canvasH){
        this.ctx = ctx
        this.canvasW = canvasW
        this.canvasH = canvasH

        this.x = this.canvasW/10
        this.y = this.canvasH * 0.13
        this.w = this.canvasW/10
        this.h = this.canvasH/10

        this.img = new Image()
        this.img.src = 'assets/dk_sprite_barril.png'
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
		if (frameCounter % 25 === 0) {
			this.img.frameIndex++

			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
		}
	}
}