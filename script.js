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


let whiteScore = 0
let blackScore = 0
const horizontalMod = 1
const verticalMod = 10
const diagDownMod = 11
const diagUpMod = 9

let legalMove = true
// Object array
let squareArray = []

// Constructor for square objects
const Square = function(id, row, col, contains, canPlaceWhite, canPlaceBlack) {
  this.id = id
  this.squareNumber = `${row}${col}`
  this.row = row
  this.col = col
    // contains will be white, black or empty and will use this to change HTML classes
  this.contains = contains
    // These two will be checked to see if white or black or neither color are allowed to be placed
  this.canPlaceWhite = canPlaceWhite
  this.canPlaceBlack = canPlaceBlack
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
      const square = new Square(`square-${row}-${col}`, row, col, 'empty', true, true)
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
    boardSquare.className = "board-square";
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

    tallyScores()
    
    // Give square a class of white black or empty based on above
    boardSquare.classList.add(pieceClass)
    board.appendChild(boardSquare);
    
    
  })
  main.appendChild(board)
  
  
}
// Make objects and then render squares
makeBoard();
renderBoard()


function legal(mod, thisSquare, color) {
    let squarePlusTwo = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + (mod * 2));
    let squareMinusTwo = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) - (mod * 2));
    if(squarePlusTwo && squareMinusTwo && color === 'white') {
      squarePlusTwo.canPlaceWhite = false
      squareMinusTwo.canPlaceWhite = false
    } else if (squarePlusTwo && squareMinusTwo && color === 'black'){
      squarePlusTwo.canPlaceBlack = false
      squareMinusTwo.canPlaceBlack = false
    }
}


function findSquare(value) {
  return squareArray.find(square => square.id === value)
}

function fourCheck(mod, thisSquare) {
  let result = true
  const fourCheckNextArray = []
  const fourCheckPrevArray = []
  for (i = 1; i < 4; i++) {
    nextSquare = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + (mod * i))
    if (nextSquare && nextSquare.contains === thisSquare.contains) {
      fourCheckNextArray.push(nextSquare)
    } else {
      break
    }
  }
  for (i = 1; i < 4; i++) {
    prevSquare = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) - (mod * i))
    if (prevSquare && prevSquare.contains === thisSquare.contains) {
      fourCheckPrevArray.push(prevSquare)
    } else {
      break
    }
  }

  if (fourCheckNextArray.length + fourCheckPrevArray.length >= 3) {
    result = false
  }
  console.log(`Result = ${result}`)
  return result
}

function fourCheckAll(thisSquare) {
  const horizontal = fourCheck(horizontalMod, thisSquare)
  const vertical = fourCheck(verticalMod, thisSquare)
  const diagDown = fourCheck(diagDownMod, thisSquare)
  const diagUp = fourCheck(diagUpMod, thisSquare)

  if (horizontal === false || vertical === false || diagDown === false || diagUp === false) {
    legalMove = false
    console.log('THAT\'S FOUR BRUH!!!')
    thisSquare.contains = 'empty'
    renderBoard()
    isWhiteTurn = !isWhiteTurn
  }
  console.log(`Four check result: ${legalMove}`)
  return legalMove
}


function threeCheck(mod, thisSquare, color) {
  let tally = 0
  let nextSquare = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + mod);
  let prevSquare = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) - mod);

  if (thisSquare.contains === color && nextSquare && prevSquare && nextSquare.contains === color && prevSquare.contains === color) {
    legal(mod, thisSquare, color)

    tally++
  }
  return tally
}

function scoreCheck(thisSquare, color, score) {
  let tally = 0
  tally = threeCheck(horizontalMod, thisSquare, color) +
  threeCheck(verticalMod, thisSquare, color) +
  threeCheck(diagDownMod, thisSquare, color) +
  threeCheck(diagUpMod, thisSquare, color)
  if (tally === 4) {
    tally -= 2
  }
  score = tally
  return score
}


function addWhiteScores(thisSquare) {
  whiteScore += scoreCheck(thisSquare, 'white', whiteScore)
  return whiteScore
}
function addBlackScores(thisSquare) {
  blackScore += scoreCheck(thisSquare, 'black', blackScore)
  return blackScore
}

function tallyScores() {
  whiteScore = 0
  blackScore = 0

  for (const thisSquare of squareArray) {
    whiteScore = addWhiteScores(thisSquare);
    blackScore = addBlackScores(thisSquare);
  }
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

    // Check for four in a row
    fourCheckAll(thisSquare)

   
        
    
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
    renderBoard()
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
