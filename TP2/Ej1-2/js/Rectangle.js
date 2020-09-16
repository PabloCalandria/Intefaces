class Rectangle extends Figure{

    constructor(posX, posY, fill, context, width, height){
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    draw(){
        super.draw();
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
    }
}