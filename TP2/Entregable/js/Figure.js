class Figure {
    
    constructor(posX, posY, radius, fill, context, img, color) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.radius = radius;
        this.highlighted = false;
        this.highlightedStyle = "black";
        this.context = context;
        this.color = color;
        this.img = img;
    }

    setPosition(x, y){
        this.posX = x;
        this.posY = y;
    }

    getColor(){
        return this.color;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getFill() {
        return this.fill;
    }

    setFill(fill) {
        this.fill = fill;
    }

    draw() {
        this.context.fillStyle = this.fill;  
        let imgSize = 90;
        this.context.drawImage(this.img, this.posX - (imgSize / 2), this.posY - (imgSize / 2), imgSize, imgSize);
        this.radius = imgSize / 2;

        if(this.highlighted === true){
            this.context.strokeStyle = this.highlightedStyle;
            this.context.lineWidth = 5;
            this.context.stroke();
        }

        this.context.closePath();
    }

    getRadius() {
        return this.radius;
    }

    isPointInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    setHighlighted(value){
        this.highlighted = value;
    }

    setHighlightedStyle(style){
        this.highlightedStyle = style;
    }

}