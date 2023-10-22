class Background {
    constructor(ctx,canvasW,canvasH){
        this.ctx = ctx
        this.imgH = canvasH
        this.canvasW = canvasW
        this.canvasH = canvasH

        this.img = new Image()
		this.img.src = 'assets/nivel1.png'
        this.imgW = this.img.width

        this.barriles = new Image()
        this.barriles.src = 'assets/barriles_salida.png'

        // this.dk = new Image()
        // this.dk.src = 'assets/dk_sprite2.png'
        // this.dk.frameIndex = 0
        // this.dk.frames = 4

    }

    draw(frameCounter){
        this.ctx.drawImage(this.img,0,0,this.canvasW,this.canvasH)
        this.ctx.drawImage(this.barriles,0,this.canvasW * 0.065,this.canvasW/10,this.canvasH/10)
        // this.drawDK(frameCounter)
    }

    // drawDK(frameCounter){
    //     this.ctx.drawImage(
    //         this.dk,
    //         this.dk.frameIndex * (this.dk.width / this.dk.frames),
    //         0,
    //         this.dk.width / this.dk.frames,
	// 		this.dk.height,
    //         this.canvasH/6,
	// 		this.canvasW * 0.033,
	// 		this.canvasW/10,
	// 		this.canvasH/5
    //     )
    //     this.animateSprite(frameCounter)
    // }

    animateSprite(frameCounter) {
		if (frameCounter % 50 === 0) {
			this.dk.frameIndex++

			if (this.dk.frameIndex >= this.dk.frames) {
				this.dk.frameIndex = 0
			}
		}
	}

}