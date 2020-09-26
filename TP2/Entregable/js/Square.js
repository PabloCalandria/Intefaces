class Square{

    constructor(context, posX, posY) {
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.color = null;
    }

    draw() {
        this.context.beginPath();
        this.context.rect(this.posX, this.posY, 100, 100);
        this.context.stroke();
    }

    getColor(){
        return this.color;
    }

    addImage(posX, posY, img){
        context.drawImage(img,posX,posY);
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setImage(img){
        context.drawImage(img,this.getPosX(),this.getPosY());
    }

    setColor(color){
        this.color = color;
    }
}