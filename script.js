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
const Square = function(id, row, col, containsWhite, containsBlack) {
  this.id = id
  this.row = row
  this.col = col
  this.containsWhite = containsWhite
  this.containsBlack = containsBlack
  // Add each object to the array as it is created
  squareArray.push(this)
  // Give each square a variable like squareArray.square00 (might not use or need)
  const varName = `square${row}${col}`;
  squareArray[varName] = this;
}

board.classList.add("board");

// Create 64 square objects
function makeBoard() {
  
  board.classList.add("board");

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = new Square(`square-${row}-${col}`, row, col, false, false)
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
    if (square.containsWhite) {
      pieceClass = 'white'
    } else if (square.containsBlack) {
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

// can be adjusted 
function turnLogic(pieceContainer, square) {
    // console.log(pieceContainer)
    // console.log(square.id)
    // Find the square object that corresponds to the square being clicked
    const thisSquare = findSquare(square.id)
    // If white turn, set the (object) square.containsWhite parameter to true, which will add a white "piece" when rendered
    
    console.log(thisSquare)
    const capture = square.id
    if (isWhiteTurn) {
      console.log("white turn");
      if (square.children.length === 0 && square.classList.contains('empty')) {
        whitePiece.classList.add("white-piece");
        square.classList.toggle('empty')
        square.classList.toggle('white')
        // square.appendChild(whitePiece.cloneNode(true));
        
        console.log(square)
        fourRowCheck(square)
        
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
        fourRowCheck(square)
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

// TODO four in a row check 
function fourRowCheck(square) {
  const row = square.row;
  const col = square.col;

  // Check if there are enough squares to form a four-in-a-row horizontally
  if (col >= 3) {
      const square1 = squareArray.find(sq => sq.row === row && sq.col === col);
      const square2 = squareArray.find(sq => sq.row === row && sq.col === col - 1);
      const square3 = squareArray.find(sq => sq.row === row && sq.col === col - 2);
      const square4 = squareArray.find(sq => sq.row === row && sq.col === col - 3);
      
      fourLogic(square1, square2, square3, square4, square);
  }
}

function fourLogic(square1, square2, square3, square4, square) {
  if (square1 === square2 && square2 === square3 && square3 === square4) {
      const piece1 = square1.querySelector(".black")
          ? "black"
          : square1.querySelector(".white")
              ? "white"
              : null;
      const piece2 = square2.querySelector(".black")
          ? "black"
          : square2.querySelector(".white")
              ? "white"
              : null;
      const piece3 = square3.querySelector(".black")
          ? "black"
          : square3.querySelector(".white")
              ? "white"
              : null;
      const piece4 = square4.querySelector(".black")
          ? "black"
          : square4.querySelector(".white")
              ? "white"
              : null;
      if (
          piece1 &&
          piece2 &&
          piece3 &&
          piece4 &&
          piece1 === piece2 &&
          piece2 === piece3 &&
          piece3 === piece4
      ) {
          console.log("four in a row");
          console.log(square1, square2, square3, square4)
          square.classList.toggle('empty')
          isWhiteTurn = !isWhiteTurn; // Toggle the turn
          return;
      }
  }
}
    

// TODO score counter

// TODO 