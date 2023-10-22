
/* ARCHIVO PARA PRUEBAS */


// todo esto va dentro de la clase barril, porque es la funcion que le permite moverse

// original

function move(){
    if(this.x > this.imgW - this.ancho || this.x < 0){
        this.dx *= -1
    }
    else if (this.x == this.imgW - this.ancho || this.x == 0){
        this.y+= this.dy
    }

    this.x += this.dx
    console.log(this.x)
}


// OPCION 1
function move(){
    
    const contactoX = (this.barril.x <= this.nivel1.x + this.nivel1.w || this.nivel2.x >= this.barril.x + this.barril.w || this.barril.x <= this.nivel3.x + this.nivel3.w || this.nivel4.x >= this.barril.x + this.barril.w || this.barril.x <= this.nivel5.x + this.nivel5.w)



    const contactoY = (this.barril.y + this.barril.h === this.nivel1.y || this.barril.y + this.barril.h === this.nivel2.y ||this.barril.y + this.barril.h === this.nivel3.y ||this.barril.y + this.barril.h === this.nivel4.y ||this.barril.y + this.barril.h === this.nivel5.y || this.barril.y + this.barril.h === this.base.y)


    if (!contactoX){
        while(!contactoY){
            y+=dy
        }
        dx *= -1
    }

    x+=dx
}


// OPCION 2

function move(){
    if(collision()){
        x+= dx
    }
    else if(!collision()){
        y += dy
    }
}

function collision(){

    let collision = false
    
    const contactoX = (this.barril.x <= this.nivel1.x + this.nivel1.w || this.nivel2.x >= this.barril.x + this.barril.w || this.barril.x <= this.nivel3.x + this.nivel3.w || this.nivel4.x >= this.barril.x + this.barril.w || this.barril.x <= this.nivel5.x + this.nivel5.w)



    const contactoY = (this.barril.y + this.barril.h === this.nivel1.y || this.barril.y + this.barril.h === this.nivel2.y ||this.barril.y + this.barril.h === this.nivel3.y ||this.barril.y + this.barril.h === this.nivel4.y ||this.barril.y + this.barril.h === this.nivel5.y || this.barril.y + this.barril.h === this.base.y)


    while (contactoX && contactoY){
        collision = true
    }

    return collision
}

/*

NECESITO:

    NIVEL1: X,W,Y
    NIVEL2: X,Y
    NIVEL3: X,W,Y
    NIVEL4: X,Y
    NIVEL5: X,W,Y
    BASE: Y

*/


function constructor(ctx,canvasW,canvasH,nivel1X,nivel1W,nivel1Y,nivel2X,nivel2Y,nivel3X,nivel3W,nivel3Y,nivel4X,nivel4Y,nivel5X,nivel5W,nivel5Y,baseY){
    this.ctx = ctx
    this.canvasW = canvasW
    this.canvasH = canvasH
    this.x = 0  
    this.y = 140
    this.ancho = 50
    this.largo = 50
    this.dx = 1
    this.dy = 25
    this.nivel1X = nivel1X
    this.nivel1W = nivel1W
    this.nivel1Y = nivel1Y
    this.nivel2X = nivel2X
    this.nivel2Y = nivel2Y
    this.nivel3X = nivel3X
    this.nivel3W = nivel3W
    this.nivel3Y = nivel3Y
    this.nivel4X = nivel4X
    this.nivel4Y = nivel4Y
    this.nivel5X = nivel5X
    this.nivel5W = nivel5W
    this.nivel5Y = nivel5Y
    this.baseY = baseY}
    




    //original
    function constructor(ctx,canvasW,canvasH){
        this.ctx = ctx
        this.canvasW = canvasW
        this.canvasH = canvasH
        this.x = 0  
        this.y = 140
        this.ancho = 50
        this.largo = 50
        this.dx = 1
        this.dy = 25}