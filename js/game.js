const Game = {
	ctx: undefined,
	canvasW: undefined,
	canvasH: undefined,
	fps: 60,
    keys : {
        jump: 'Space',
        right: 'KeyD',
        left: 'KeyA',
        up: 'KeyW',
        down: 'KeyS'
    },

    init: function () {
		const canvas = document.querySelector('canvas')
		this.ctx = canvas.getContext('2d')

		this.canvasW = canvas.width = innerWidth
		this.canvasH = canvas.height = innerHeight
        this.reset()
	},

    reset: function () {

        this.background = new Background(this.ctx, this.canvasW, this.canvasH)


        this.niveles = [

        new Nivel(this.ctx,this.canvasW - this.canvasW * 0.61,this.canvasH*0.095,this.canvasW/0.9245 * 0.22,this.canvasH),

        new Nivel(this.ctx,0,this.canvasH*0.229,this.canvasW,this.canvasH),

        new Nivel(this.ctx,this.canvasW - this.canvasW * 0.935,this.canvasH*0.3435,this.canvasW*1.3,this.canvasH),

        new Nivel(this.ctx,0,this.canvasH*0.497,this.canvasW,this.canvasH),

        new Nivel(this.ctx,this.canvasW - this.canvasW * 0.935,this.canvasH*0.6552,this.canvasW*1.3,this.canvasH),

        new Nivel(this.ctx,0,this.canvasH*0.8117,this.canvasW,this.canvasH),

        new Nivel(this.ctx,0,this.canvasH*0.9644,this.canvasW/0.9245,this.canvasH *1.25 ),

        ]

        this.escaleras = [
            new Escaleras(this.ctx,this.canvasW*0.28125,0,this.canvasW * 0.035807,this.canvasH*0.229),
            new Escaleras(this.ctx,this.canvasW*0.35286,0,this.canvasW * 0.035807,this.canvasH*0.229),            
            new Escaleras(this.ctx,this.canvasW*0.568359,this.canvasH*0.095,this.canvasW * 0.035807,this.canvasH*0.134),
            new Escaleras(this.ctx,this.canvasW*0.828776,this.canvasH*0.229,this.canvasW * 0.035807,this.canvasH*0.1145),
            new Escaleras(this.ctx,this.canvasW*0.091145,this.canvasH*0.3435,this.canvasW * 0.035807,this.canvasH*0.1535),
            new Escaleras(this.ctx,this.canvasW*0.885416,this.canvasH*0.497,this.canvasW * 0.035807,this.canvasH*0.1582),
            new Escaleras(this.ctx,this.canvasW*0.123687,this.canvasH*0.6552,this.canvasW * 0.035807,this.canvasH*0.1565),
            new Escaleras(this.ctx,this.canvasW*0.885416,this.canvasH*0.8117,this.canvasW * 0.035807,this.canvasH*0.1527)
        ]
        
        // w 1536 h 786

        this.barril = []

        this.dk = new DonkeyKong(this.ctx,this.canvasW,this.canvasH)

        this.peach = new Peach(this.ctx,this.canvasW,this.canvasH)

        this.mario = new Player(this.ctx,this.canvasW,this.canvasH,this.keys)
		
		this.start()
	},

    start: function () {
		// loop de render

		this.frameCounter = 0
        this.generador = 100
        this.score = 10000

		this.intervalId = setInterval(() => {
			

			this.frameCounter++

			this.score -= 1
            console.log(this.score)
            if(this.score == 0){
                this.gameOver()
            }

            this.drawAll()
            this.moveAll()
            
			if (this.frameCounter % this.generador === 0) {
				this.generateBarril()
			}

		}, 1000 / this.fps)
	},

    drawAll(){
        this.background.draw(this.frameCounter)
        this.dk.draw(this.frameCounter)
        this.peach.draw(this.frameCounter)
        this.niveles.forEach((nivel) => {
            nivel.draw()
        })
        this.escaleras.forEach((escalera) => {
            escalera.draw()
        })
        this.mario.draw(this.frameCounter)
        this.barril.forEach((barril) => {
            barril.draw(this.frameCounter)
            if (
                !this.niveles.some((nivel) => {
                    const isCollisionBarrilNivel =
                        barril.y + barril.h >= nivel.y &&
                        barril.y < nivel.y + nivel.h &&
                        barril.x + barril.w > nivel.x &&
                        barril.x < nivel.x + nivel.w
        
                    if (isCollisionBarrilNivel) {
                        barril.stop()
                        barril.y = nivel.y - barril.h
                    }
        
                    return isCollisionBarrilNivel
                })
            )
            barril.fall()
            if(barril.y > this.canvasH + 200) this.barril.shift(0)
            const isCollisionMarioBarril = 
                barril.y + barril.h > this.mario.y &&
                barril.y < this.mario.y + this.mario.h &&
                barril.x + barril.w*0.5 > this.mario.x &&
                barril.x < this.mario.x + this.mario.w*0.5
            // if(isCollisionMarioBarril) this.gameOver()
        })

        if(!this.niveles.some((nivel)=>{
            const isCollisionMarioNivel =
                this.mario.y + this.mario.h >= nivel.y &&
                this.mario.y <= nivel.y - this.canvasH * 0.02 &&
                this.mario.x + this.mario.w > nivel.x &&
                this.mario.x < nivel.x + nivel.w
        
            if (isCollisionMarioNivel) {
                if(this.mario.actions.jump ){
                    this.mario.actions.jump = false
                }
                if(!this.mario.actions.enEscalera) {
                    this.mario.y = nivel.y - this.mario.h
                 }    
            }

            return isCollisionMarioNivel
        })){

            if(!this.mario.actions.enEscalera) {
                this.mario.actions.jump = true   
            }
     
        }
    

        if(!this.escaleras.some((escalera)=>{
            const isCollisionMarioEscalera =
                this.mario.y + this.mario.h >= escalera.y &&
                this.mario.y + this.mario.h <= escalera.y + escalera.h &&
                this.mario.x + this.mario.w/2 > escalera.x &&
                this.mario.x + this.mario.w/2< escalera.x + escalera.w
        
                if (isCollisionMarioEscalera) {
                    this.mario.actions.enEscalera = true
                }

                return isCollisionMarioEscalera
        })){
            this.mario.actions.enEscalera = false
        }

        const isCollisionMarioPeach = 
            this.mario.y + this.mario.h >= this.peach.y &&
            this.mario.y <= this.peach.y + this.peach.h &&
            this.mario.x + this.mario.w/2 > this.peach.x &&
            this.mario.x < this.peach.x + this.peach.w/2
        
        if (isCollisionMarioPeach){
            this.gameWon()
        }
    },

    moveAll(){
        this.barril.forEach((barril) => {
            barril.move()
        })
        this.mario.move()
    },

    generateBarril: function () {
		this.barril.push(
			new Barril(this.ctx,this.canvasW,this.canvasH)
		)
	},
    gameOver: function () {
		// para el intervalo que implementa el loop de animación
		clearInterval(this.intervalId)

		if (confirm('GAME OVER! ¿Volver a jugar?')) {
			this.reset()
		}
	},

    gameWon: function () {
		// para el intervalo que implementa el loop de animación
		clearInterval(this.intervalId)

		if (confirm(`Enhorabuena! Tu score es de ${this.score} puntos. ¿Quieres volver a jugar?`)) {
			this.reset()
		}
	}
    
}