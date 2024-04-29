const board = document.createElement("div");
const main = document.getElementById("container");
const btn = document.getElementById("submit-score");
let whitePiece = document.createElement("div");
let blackPiece = document.createElement("div");
let isWhiteTurn = true;
let lastPlacedPiece = null;
let lastPlacedSquare = null;
// let clickedSquare = null;
// let clickedPiece = null;

// Object array
let squareArray = []

// Constructor for square objects
const Square = function(id, row, col, contains, canPlace) {
  this.id = id
  this.squareNumber = `${row}${col}`
  this.row = row
  this.col = col
  this.contains = contains
  this.canPlace = canPlace
  // Add each object to the array as it is created
  squareArray.push(this)
  // Give each square a variable like squareArray.square00 (might not use or need)
//   const varName = `square${row}${col}`;
//   squareArray[varName] = this;
}

board.classList.add("board");

// Create 64 square objects
function makeBoard() {
  
  board.classList.add("board");

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = new Square(`square-${row}-${col}`, row, col, 'empty', true)
    }  
  }   
}

// Render board from square objects
function renderBoard() {
  board.innerHTML = ''
  squareArray.forEach((square) => {
    // Create square divs
    const boardSquare = document.createElement("div");
    // Make each square div a board square
    boardSquare.classList.add("board-square");
    // Set the ID of the board square to the current square object being used to create the square
    boardSquare.id = square.id;
    let pieceClass;
    // This is just a test to see if the classes stayed between renderings
    if (square.contains === 'white') {
      pieceClass = 'white'
    } else if (square.contains === 'black') {
      pieceClass = 'black'
    } else {
      pieceClass = 'empty'
    }
    // Give square a class of white black or empty based on above
    boardSquare.classList.add(pieceClass)
    board.appendChild(boardSquare);
    
    
  })
  main.appendChild(board)
}
// Make objects and then render squares
makeBoard();
renderBoard()


function findSquare(value) {
  return squareArray.find(square => square.id === value)
}

function fourCheckLoop(thisSquare) {
  const fourCheckRightArray = [];
  const fourCheckLeftArray = [];
  const fourCheckUpArray = [];
  const fourCheckDownArray = [];
  for (i = 1; i < 4; i++) {
    squareRight = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + i )
    if (squareRight && squareRight.contains === thisSquare.contains) {
      fourCheckRightArray.push(squareRight)
    }
  }

  for (i = 1; i < 4; i++) {
    squareLeft = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) - i )
    if (squareLeft && squareLeft.contains === thisSquare.contains) {
      fourCheckLeftArray.push(squareLeft)
    }
  }

  for (i = 1; i < 4; i++) {
    squareUp = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) - (i * 10))
    if (squareUp && squareUp.contains === thisSquare.contains) {
      fourCheckUpArray.push(squareUp)
    }
  }

  for (i = 1; i < 4; i++) {
    squareDown = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + (i * 10))
    if (squareDown && squareDown.contains === thisSquare.contains) {
      fourCheckDownArray.push(squareDown)
    }
  }
  if (fourCheckRightArray.length + fourCheckLeftArray.length >= 3 || fourCheckUpArray.length + fourCheckDownArray.length >= 3) {
    console.log('THAT\'S FOUR BRUH!!!')
    thisSquare.contains = 'empty'
    return
  }
  console.log(fourCheckRightArray, fourCheckLeftArray, fourCheckUpArray, fourCheckDownArray)
}

// can be adjusted 
function turnLogic(pieceContainer, square) {
    // console.log(pieceContainer)
    // console.log(square.id)
    // Find the square object that corresponds to the square being clicked
    const thisSquare = findSquare(square.id)
    if (isWhiteTurn) {
      thisSquare.contains = 'white'
    } else {
      thisSquare.contains = 'black'
    }
    
    console.log(thisSquare)

    if (isWhiteTurn) {
      fourCheckLoop(thisSquare)
    } else {
      fourCheckLoop(thisSquare)
    }
    
    
    const capture = square.id
    if (isWhiteTurn) {
      console.log("white turn");
      if (square.children.length === 0 && square.classList.contains('empty')) {
        whitePiece.classList.add("white-piece");
        square.classList.toggle('empty')
        square.classList.toggle('white')
        // square.appendChild(whitePiece.cloneNode(true));
        
        console.log(square)
        
        lastPlacedPiece = whitePiece;
        lastPlacedSquare = square;
        
        
        
        console.log("Piece placed on square:", square);
        isWhiteTurn = !isWhiteTurn;
      } else if (square.classList.contains('black' || 'white')) {
        console.log("There is already a piece there.");
       
        
        
        return;
      }
    } else {
      console.log("black turn");
      if (square.children.length === 0 && square.classList.contains('empty')){
        
        blackPiece.classList.add("black-piece");
        square.classList.toggle('empty')
        square.classList.toggle('black')
        // square.appendChild(blackPiece.cloneNode(true));
        console.log(square)
        lastPlacedPiece = this;
        lastPlacedSquare = square;
       
    
        console.log("Piece placed on square:", square);
        isWhiteTurn = !isWhiteTurn;
      } else if (square.classList === 'black' || 'white') {
        console.log("There is already a piece there.");
        console.log(square)
        
        
        return;
      }
    }
  }



console.log(board)
// btn.addEventListener("click", calculateScores);
board.addEventListener('click', function(event) {
  console.log(event.target)
  
  const pieceContainer = event.target.id
  const square = event.target



  if (event.target.matches('.white') ) {
    console.log('white piece clicked')
    
  } else if (event.target.matches('.black')) {
    console.log('black piece clicked')
    

  } else if (event.target.matches('.board-square')) {
    turnLogic(pieceContainer, square)
    console.log(`board-square ${event.target.id} clicked`)
  }
 })


// TODO capture function
