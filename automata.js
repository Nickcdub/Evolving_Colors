class Automata {
    //I took inspiration from the addPlant addAnimat system from Chris Marriott's solution
    constructor(){
        
        //Creates an array of size grideSize and in each array index ...
        this.grid = Array.from({ length: PARAMS.gridSize }, () =>
        //Another array of size grideSize to make our grid
        Array.from({ length: PARAMS.gridSize }, () => null)
        );
        this.animats = [];


    }

    toroid(x){
        return (x + PARAMS.gridSize) % PARAMS.gridSize;
    }

    //Check for vacant neighbors if isNull is set to true
    getNeighbor(x, y, isNull){
        let neighbors = [];
        //Check right neighbor
        if((this.grid[this.toroid(x+1)][y] == null) == isNull) neighbors.push({x: this.toroid(x+1), y: y});
        
        //Check left neighbor
        if((this.grid[this.toroid(x-1)][y] == null) == isNull) neighbors.push({x: this.toroid(x-1), y: y});
        
        //Check top neighbor
        if((this.grid[x][this.toroid(y+1)] == null) == isNull) neighbors.push({x: x, y: this.toroid(y+1)});
        
        //Check bottom neighbor
        if((this.grid[x][this.toroid(y-1)] == null) == isNull) neighbors.push({x: x, y: this.toroid(y-1)});
        
        return neighbors;
    }

    //Return random vacant neighbor
    randomNeighbor(x, y){
        let neighbors = this.getNeighbor(x,y,true);
        if(neighbors.length < 1) return null;
        else return neighbors[randomInt(neighbors.length)];
    }

    hueNeighbor(x, y, hue){
        let neighbors = this.getNeighbor(x,y,false);
        let min = null;
        if(neighbors.length > 0){
            min = {info: neighbors[0], diff: Math.abs(hue - this.grid[neighbors[0].x][neighbors[0].y].hue)};
            for(let i = 1; i<neighbors.length; i++){
                let current = this.grid[neighbors[i].x][neighbors[i].y].hue
                if(Math.abs(hue - current) < min.diff){
                    min = {info: neighbors[i], diff: Math.abs(hue - current)}
                }
            }
        }
        return min;
    }

    randomCell(){
        return {x: randomInt(PARAMS.gridSize), y: randomInt(PARAMS.gridSize)};
    }

    addPlant(){
        let location = this.randomCell();
        let i = location.x;
        let j = location.y;
        this.grid[i][j] = new Plant({hue: randomInt(360), x: i, y: j}, this);
    }

    addAnimat(){
        let location = this.randomCell();
        let i = location.x;
        let j = location.y;
        this.animats.push(new Animat({hue: randomInt(360), x: i, y: j}, this));
    }

    removeAnimat(x, y) {
        const indexToRemove = this.animats.findIndex(animat => animat.x === x && animat.y === y && animat.energy < 1);
        if (indexToRemove !== -1) {
            this.animats.splice(indexToRemove, 1);
        }
    }

    update() {
		for(let i = 0; i < PARAMS.gridSize; i++) {
			for(let j = 0; j < PARAMS.gridSize; j++) {
				if(this.grid[i][j] != null) this.grid[i][j].update();
				if(Math.random() < 0.001) this.grid[i][j] = null;
			}
		}

        for(let k = 0; k < this.animats.length; k++){
            this.animats[k].update();
            if(Math.random() < 0.001 && this.animats[k] != null){
                this.animats[k].energy = 0;
                this.animats[k].remove();
            }
        }

	}

	draw(ctx) {
		for(let i = 0; i < PARAMS.gridSize; i++) {
			for(let j = 0; j < PARAMS.gridSize; j++) {
				if(this.grid[i][j] != null) this.grid[i][j].draw(ctx);
			}
		}

        for(let k = 0; k < this.animats.length; k++){
            this.animats[k].draw(ctx);
        }
	}

    
}