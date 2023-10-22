class Player {
    constructor(ctx,canvasW,canvasH,keys){
        this.ctx = ctx
        this.canvasW = canvasW
        this.canvasH = canvasH
        this.keys = keys
        this.x = this.canvasW*0.05
        this.y = this.canvasH*0.9 
        this.y0
        this.w = 36
        this.h = 24

        this.img = new Image()
        this.img.src = 'assets/marioQuietoDCHA.png'
        this.img.frameIndex = 0
        this.img.frames = 1

        this.vx = 2
        this.vy = 0
		this.gravity = 0.3


        this.actions = {
			jump: false,
			right: false,
            left: false,
            up: false,
            down: false,
            enEscalera: false
		}

        this.setControls()
    }

    setControls(){
        document.addEventListener('keydown', (event) => {
			switch (event.code) {
				case this.keys.jump:
                    if(!this.actions.jump){
					this.actions.jump = true
                    this.vy = -4
                    this.y -= 20
                    }
					break

				case this.keys.right:
					this.actions.right = true
                    this.img.src = 'assets/marioDCHA.png'
                    this.img.frames = 3
                 
					break
                
                case this.keys.left:
					this.actions.left = true
                    this.img.src = 'assets/marioIZQ.png'
                    this.img.frames = 3
                 
					break
                
                case this.keys.up:
                    if(this.actions.enEscalera) {
                        this.y -= 1
                        this.actions.up = true
                        this.img.src = 'assets/marioUP.png'
                        this.img.frames = 3
                    }
				    break

                case this.keys.down:
                    if(this.actions.enEscalera) {
                        this.actions.down = true
                        this.img.src = 'assets/marioUP.png'
                        this.img.frames = 3
                    }
				    break
			}
        
		})

        document.addEventListener('keyup', (event) => {
			switch (event.code) {

				case this.keys.right:
					this.actions.right = false
                    this.img.src = 'assets/marioQuietoDCHA.png'
                    this.img.frames = 1
                  
					break
                
                case this.keys.left:
			    	this.actions.left = false
                    this.img.src = 'assets/marioQuietoIZQ.png'
                    this.img.frames = 1
               
					break
                
                case this.keys.up:

					this.actions.up = false
                    if(this.actions.enEscalera) {
                    this.img.src = 'assets/marioQuietoUP.png'
                    this.img.frames = 1
                    }else {
                        this.img.src = 'assets/marioQuietoDCHA.png'
                        this.img.frames = 1
                    }
                  
					break

                case this.keys.down:
				
					this.actions.down = false
                    if(this.actions.enEscalera) {
                        this.img.src = 'assets/marioQuietoUP.png'
                        this.img.frames = 1
                    }else {
                        this.img.src = 'assets/marioQuietoDCHA.png'
                        this.img.frames = 1
                    }
                
                 
					break
			}
        })
    }
    move() {
        if(this.actions.enEscalera && this.actions.down){
           this.y += 2
        }
        else if(this.actions.enEscalera && this.actions.up){
            this.y -= 2
        }
        else if (this.actions.jump) {
            this.vy += this.gravity 
            this.y += this.vy
        }
        else {
            this.vy = 0
        }

        if(this.actions.right) this.x += this.vx
        else if (this.actions.left) this.x -= this.vx
	}

    draw(frameCounter){
        // this.ctx.fillRect(this.x,this.y,this.w,this.h)
        // this.ctx.fillStyle = 'white'
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
}