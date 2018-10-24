var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

menu();

function menu() {
	var botonx = 140;
	var botony = 200;
	var botonw = 120;
	var botonh = 30;

	ctx.fillStyle = "#b4a451";
	ctx.fillRect(botonx, botony, botonw+3, botonh+3);
	ctx.fillStyle = "#e1cd66";
	ctx.fillRect(botonx, botony, botonw, botonh);

 	ctx.font = '30px verdana';
 	ctx.fillStyle = 'black';
 	ctx.fillText('Game of Life', 100, 180);
  	ctx.font = '15px courier';
  	ctx.fillText('0 PLAYERS', 157, 220);
  	ctx.fillText('v0.1', 350, 385);

	canvas.addEventListener('click', function(event) {
		if(
			event.x > botonx &&
			event.x < botonx + botonw &&
			event.y > botony &&
			event.y < botony + botonh
		){
			ctx.fillStyle = "#706633";
			ctx.fillRect(botonx, botony, botonw+3, botonh+3);
			ctx.fillStyle = "#877b3d";
			ctx.fillRect(botonx, botony, botonw, botonh);
			ctx.fillStyle = 'black';
			ctx.font = '15px courier';
			ctx.fillText('0 PLAYERS', 157, 220);

			setTimeout(function() {  				
				ctx.clearRect(0, 0, 400, 400);
				startLife();
			}, 10);
		}
	});	
}

function startLife() {
	var gridHeight = 400;
	var gridWidth = 400;
	var grid = createArray(gridWidth);
	var copiaGrid = createArray(gridWidth); 

	fillRandom();
	loop();

	function loop() {
		drawGrid();
		actualizarGrid();
		requestAnimationFrame(loop);
	}

	function createArray(rows) { //crea un array para imprimir en pantalla
		var arr = [];
		for (var i = 0; i < rows; i++) {
			arr[i] = [];
		}
		return arr;
	}

	function fillRandom() { //rellenar aleatoriamente
		for (var j = 0; j < gridHeight; j++) { 
		for (var k = 0; k < gridWidth; k++) { 
			grid[j][k] = Math.round(Math.random());
		    }
		}
	}

	function drawGrid() { //dibuja los valores de la tabla en el canvas
		ctx.clearRect(0, 0, 400, 400);

		for(var j = 1; j < gridHeight; j++) {
			for(var k = 1; k < gridWidth; k++) {
				if(grid[j][k] === 1) {
					ctx.fillStyle = "#22232d";
					ctx.fillRect(j, k, 1, 1);
				}
			}
		}
	}

	function actualizarGrid() { //cambia valores de casillas y los copia al grid
		for(var j = 1; j < gridHeight - 1; j++) {
			for(var k = 1; k < gridWidth - 1; k++) {
				var totCel = 0;

				totCel += grid[j - 1][k + 1];
				totCel += grid[j - 1][k];
				totCel += grid[j - 1][k - 1];

				totCel += grid[j][k + 1];
				totCel += grid[j][k - 1];

				totCel += grid[j+1][k+1];
				totCel += grid[j + 1][k];
				totCel += grid[j + 1][k - 1]

				if(grid[j][k] === 0){
					switch (totCel) {
						case 3:
							copiaGrid[j][k] = 1;
							break;
						default:
							copiaGrid[j][k] = 0;
					}

				} else if(grid[j][k] === 1) {
					switch(totCel) {
						case 0:
						case 1:
							copiaGrid[j][k] = 0;
							break
						case 2:
						case 3:
							copiaGrid[j][k] = 1;
							break
						case 4:
						case 5:
						case 6:
						case 7:
						case 8:
							copiaGrid[j][k] = 0;
							break;
						default:
							copiaGrid[j][k] = 0;
					}
				}
			}
		}

		//actualizar grid con datos de copiaGrid
		for(var j = 0; j < gridHeight; j++) {
			for(var k =0; k < gridWidth; k++) {
				grid[j][k] = copiaGrid[j][k];
			}
		}
	}
}