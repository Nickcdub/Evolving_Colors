class Plant{
    //info will hold the location of this plant and its color
    constructor(info, automata){
        this.hue = info.hue;
        this.x = info.x;
        this.y = info.y;
        this.automata = automata;
        this.age = 1;
    }

    grow(){
        let nextSpot = this.automata.randomNeighbor(this.x,this.y);
        if(nextSpot != null){
            let newX = nextSpot.x;
            let newY = nextSpot.y;
            let newHue = (this.hue + randomInt(PARAMS.plantVariation))%360
            this.automata.grid[newX][newY] = new Plant({hue: newHue, x: newX, y: newY}, this.automata)
        }
    }

    update(){
        if(this.age < 4) this.age++;
        if(this.age == 4) {
            this.grow();
        }
    }

    //Heavily inspired by Chris Marriott's implementation
    draw(ctx){
        ctx.fillStyle = hsl(this.hue,20 + this.age*20,50);
		ctx.strokeStyle = "blue";
		ctx.fillRect(this.x*PARAMS.cellSize, this.y*PARAMS.cellSize, PARAMS.cellSize, PARAMS.cellSize);
		ctx.strokeRect(this.x*PARAMS.cellSize, this.y*PARAMS.cellSize, PARAMS.cellSize, PARAMS.cellSize);
    }

}