class Figure {
    
    constructor(posX, posY, radius, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.radius = radius;
        this.highlighted = false;
        this.highlightedStyle = "black";
        this.context = context;
    }

    setPosition(x, y){
        this.posX = x;
        this.posY = y;
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
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();

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