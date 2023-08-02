const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	let automata = new Automata();
	gameEngine.addEntity(automata);

	//Add button stuff here
	document.getElementById("addPlant").addEventListener("click", () => {
		automata.addPlant();
	});

	document.getElementById("addAnimat").addEventListener("click", () => {
		automata.addAnimat();
	});

	document.getElementById("clearGrid").addEventListener("click", () => {
		automata = new Automata();
		gameEngine.replaceEntity(automata);
	});

	const plantVariationSlider = document.getElementById("plantVariation");
    plantVariationSlider.addEventListener("input", () => {
	PARAMS.plantVariation = parseInt(plantVariationSlider.value);
	});
	
	const animalVariationSlider = document.getElementById("animalVariation");
    animalVariationSlider.addEventListener("input",  () => {
		PARAMS.animatVariation = parseInt(animalVariationSlider.value);
	});

	gameEngine.init(ctx);

	gameEngine.start();

	
});
