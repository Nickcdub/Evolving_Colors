class Animat{
        //info will hold the location of this plant and its color
    constructor(info, automata){
        this.hue = info.hue;
        this.x = info.x;
        this.y = info.y;
        this.automata = automata;
        this.energy = 180;
    }

    populate(){
        let newHue = (this.hue + randomInt(PARAMS.animatVariation))%360;
        //new Animat({hue: newHue, x: this.x, y: this.y}, this)
        this.automata.animats.push(new Animat({hue: newHue, x: this.x, y: this.y}, this.automata));
        this.energy = 180 ;
    }

    eat(){
        let food = this.automata.hueNeighbor(this.x,this.y, this.hue);
        if(food != null) {
            this.x = food.info.x;
            this.y = food.info.y;
            this.automata.grid[this.x][this.y] = null;
            this.energy += PARAMS.foodTolerance - food.diff;
        }
    }

    remove(){
        this.automata.removeAnimat(this.x,this.y);
    }

    update(){
        this.eat();
        this.energy--;
        if(this.energy >= 520) this.populate();
        if(this.energy < 1) {
            this.remove();
        }
    }

    //Heavily inspired by Chris Marriott's implementation
    draw(ctx) {
		ctx.fillStyle = hsl(this.hue,75,50);
		ctx.strokeStyle = "dark gray";
		ctx.beginPath();
		ctx.arc((this.x + 1/2)*PARAMS.cellSize, (this.y + 1/2)*PARAMS.cellSize, PARAMS.cellSize/2 - 1, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
	}

}