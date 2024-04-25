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

board.classList.add("board");

function makeBoard() {
  
  board.classList.add("board");

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const boardSquare = document.createElement("div");
      boardSquare.classList.add("board-square");
      boardSquare.id = `square-${row}-${col}`;
    
      
       
        
      // clickedPiece = this.querySelector(".white-piece") || this.querySelector(".black-piece");
        
      // });

      board.appendChild(boardSquare);
    }
    main.appendChild(board);
    
  }
  
              
        
}

makeBoard();


// can be adjusted 
function turnLogic(pieceContainer, square) {
    console.log(pieceContainer)
    console.log(square.id)
    const capture = square.id
    if (isWhiteTurn) {
      console.log("white turn");
      if (square.children.length === 0) {
        whitePiece.classList.add("white-piece");
        square.appendChild(whitePiece.cloneNode(true));
        fourRow(square)
        
        lastPlacedPiece = whitePiece;
        lastPlacedSquare = square;
        console.log(lastPlacedSquare)
        
        
        console.log("Piece placed on square:", square);
        isWhiteTurn = !isWhiteTurn;
      } else if (pieceContainer.contains() === document.querySelector(".white-piece")) {
        console.log("There is already a piece there.");
        // captureOptionHandler()
        capturePiece(capture, lastPlacedSquare);
        
        return;
      }
    } else {
      console.log("black turn");
      if (square.children.length === 0) {
        
        blackPiece.classList.add("black-piece");
        square.appendChild(blackPiece.cloneNode(true));
        fourRow(square)
        lastPlacedPiece = this;
        lastPlacedSquare = square;
        console.log(lastPlacedSquare)
    
        console.log("Piece placed on square:", square);
        isWhiteTurn = !isWhiteTurn;
      } else if (boardSquare.querySelector(".black-piece")) {
        console.log("There is already a piece there.");
        // captureOptionHandler()
        capturePiece(capture);
        
        
        return;
      }
    }
  }



console.log(board)
// btn.addEventListener("click", calculateScores);
board.addEventListener('click', function(event) {
  console.log(event.target)
  console.log('hello')
  const pieceContainer = event.target.id
  const square = event.target



  if (event.target.matches('.white-piece') ) {
    console.log('white piece clicked')
    
  } else if (event.target.matches('.black-piece')) {
    console.log('black piece clicked')
    

  } else if (event.target.matches('.board-square')) {
    turnLogic(pieceContainer, square)
    console.log(`board-square ${event.target.id} clicked`)
  }
 })


// TODO capture function

// TODO four in a row check 
function fourRow(square) {
  console.log(square);
  
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      // const squareId = `square-${row}-${col}`;
      // const currentSquare = document.getElementById(squareId);
      const row = parseInt(square.id.split('-')[1]);
      const col = parseInt(square.id.split('-')[2]); 

          const square1 = document.getElementById(`square-${row}-${col}`);
          const square2 = document.getElementById(`square-${row}-${col - 1}`);
          const square3 = document.getElementById(`square-${row}-${col - 2}`);
          const square4 = document.getElementById(`square-${row}-${col - 3}`);

          if (square1 && square2 && square3 && square4) {
              const piece1 = square1.querySelector(".black-piece")
                  ? "black"
                  : square1.querySelector(".white-piece")
                      ? "white"
                      : null;
              const piece2 = square2.querySelector(".black-piece")
                  ? "black"
                  : square2.querySelector(".white-piece")
                      ? "white"
                      : null;
              const piece3 = square3.querySelector(".black-piece")
                  ? "black"
                  : square3.querySelector(".white-piece")
                      ? "white"
                      : null;
              const piece4 = square4.querySelector(".black-piece")
                  ? "black"
                  : square4.querySelector(".white-piece")
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
                  square4.querySelector(".black-piece") ? square4.removeChild() : square4.querySelector('.white-piece') ? square4.removeChild() : null;
                  isWhiteTurn = !isWhiteTurn; // Toggle the turn
                  return;
              }
          }
      }
  }
}
    

// TODO score counter

// TODO 