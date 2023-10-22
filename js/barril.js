

class Barril{
    constructor(ctx,canvasW,canvasH){
        this.ctx = ctx
        this.canvasW = canvasW
        this.canvasH = canvasH
        this.x = this.canvasW/5.8 
        this.y = this.canvasH * 0.19        
        this.w = 36
        this.h = 24

        this.img = new Image()

        this.img.frameIndex = 0
		this.img.frames = 4

        this.vx = -5

        this.fall()
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
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++

			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
		}
	}

    stop() {
		if (this.falling) {
            this.vx *= -1
            if(this.vx < 0){
                this.vx += 0.5
                this.img.src = 'assets/barril2b.png'
            }else if(this.vx > 0){
                this.vx -= 0.5
                this.img.src = 'assets/barril2a.png'
            }
        }

		this.falling = false
		this.vy = 0
	}

    fall() {
		if (this.falling) return

		this.vy = 2
		this.falling = true
	}

    move() {
		const gravity = 0.3

		if (this.falling) {
			this.vy += gravity
			this.y += this.vy
		} else {
			this.x += this.vx
		}
	}
}
