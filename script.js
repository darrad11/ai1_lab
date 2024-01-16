var map;
var currTile, otherTile;
var rows = 2;
var columns = 4;
var boardImages,piecesImages;

// Geolocation
function updateLocation(lat, lon) {
    var userMarker = L.marker([lat, lon]).addTo(map);
    userMarker.bindPopup('Updated Location').openPopup();
	
	var latitudeElement = document.getElementById('latitude');
    var longitudeElement = document.getElementById('longitude');

    latitudeElement.innerText = lat.toFixed(4);
	longitudeElement.innerText = lon.toFixed(4);
}

function getLocation() {
    if (!navigator.geolocation) {
        alert("Error: geolocation not available");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        console.log("New Coordinates:", lat, lon);

        map.setView([lat, lon], 11);

        updateLocation(lat, lon);
    }, (positionError) => {
        console.error(positionError);
    }, {
        enableHighAccuracy: false
    });
}

// Drag-and-Drop

function clearPuzzlePieces() {
    var piecesContainer = document.getElementById('pieces');
    piecesContainer.innerHTML = '';
}

function createPuzzlePieces() {
    var rasterCanvas = document.getElementById('rasterMap');
    var piecesContainer = document.getElementById('pieces');
    var pieceWidth = 125;
    var pieceHeight = 125;

    for (var i = 0; i < 8; i++) {
        var pieceCanvas = document.createElement('canvas');
        pieceCanvas.width = pieceWidth;
        pieceCanvas.height = pieceHeight;
        var pieceContext = pieceCanvas.getContext('2d');

        var row = Math.floor(i / 4);
        var col = i % 4;

        pieceContext.drawImage(
            rasterCanvas,
            col * pieceWidth, row * pieceHeight,
            pieceWidth, pieceHeight,
            0, 0,
            pieceWidth, pieceHeight
        );

        var puzzlePiece = document.createElement('div');
        puzzlePiece.className = 'puzzle-piece';
        puzzlePiece.appendChild(pieceCanvas);
        piecesContainer.appendChild(puzzlePiece);
    }

    // Drag-and-drop
    var puzzlePieces = document.querySelectorAll('.puzzle-piece');
    puzzlePieces.forEach(function (piece) {
        piece.setAttribute('draggable', 'true');
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('dragenter', dragEnter);
        piece.addEventListener('drop', dragDrop);
        piece.addEventListener('dragleave', dragLeave);
        piece.addEventListener('dragend', dragEnd);
    });
}

//Endgame
function checkGameEnded() {
	var gameWon = true;
	for (var i = 0; i < boardImages.length; i++) {
        if (boardImages[i].src !== piecesImages[i].src) {
			console.log("Continue...");
			gameWon = false;
            break;
        }
	}
	if (gameWon) {
		console.log("You won!");
		var winMessage = document.getElementById('winMessage');
		winMessage.innerText = "You won!";
	}
}

// Main
window.onload = function () {
    // Default place on the map
    map = L.map('map').setView([53.447, 14.492], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let marker = L.marker([53.447, 14.492]).addTo(map);

    // Change geo button
    document.getElementById("getLocation").addEventListener("click", getLocation);

    // Raster
    document.getElementById('saveButton').addEventListener('click', function () {
        var mapContainer = document.getElementById('map');
        var rasterCanvas = document.getElementById('rasterMap');
        // clearPuzzlePieces();
        html2canvas(mapContainer, { useCORS: true }).then(function (canvas) {
            var rasterContext = rasterCanvas.getContext('2d');
            rasterContext.clearRect(0, 0, rasterCanvas.width, rasterCanvas.height); // Clear previous raster
            rasterContext.drawImage(canvas, 0, 0, rasterCanvas.width, rasterCanvas.height);

            // createPuzzlePieces(rasterCanvas);
        });
    });

    // Reset game button
    document.getElementById("resetButton").addEventListener("click", function () {
        location.reload();
        console.clear();
    });

    // Gameplay
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./img/blank.jpg";
            tile.draggable = true;

            tile.addEventListener("dragstart", dragStart); 
			tile.addEventListener("dragover", dragOver); 
			tile.addEventListener("dragenter", dragEnter); 
			tile.addEventListener("dragleave", dragLeave); 
			tile.addEventListener("drop", dragDrop);   
			tile.addEventListener("dragend", dragEnd); 
            
			document.getElementById("board").append(tile);
			tile.dataset.index = r * columns + c;
        }
    }

    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString()); 
	}
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./img/" + pieces[i] + ".jpg";
        tile.draggable = true;

        tile.addEventListener("dragstart", dragStart); 
        tile.addEventListener("dragover", dragOver); 
        tile.addEventListener("dragenter", dragEnter); 
        tile.addEventListener("dragleave", dragLeave); 
        tile.addEventListener("drop", dragDrop);   
		tile.addEventListener("dragend", dragEnd); 
		
        document.getElementById("pieces").append(tile);
		tile.dataset.index = i;
    }
	
	boardImages = document.getElementById("board").getElementsByTagName("img");
	piecesImages = document.getElementById("pieces").getElementsByTagName("img");

	
	//CHECK PUZZLE
	var checkGameButton = document.getElementById("checkGameButton");
    checkGameButton.addEventListener("click", function () {
        checkGameEnded();
    });
}


function dragStart() {
    currTile = this; 
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; 
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
	
	checkGameEnded();
}
