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

const horizontalMod = 1
const verticalMod = 10
const diagDownMod = 11
const diagUpMod = 9

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
  let legalMove = true
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

let whiteScore = 0
let blackScore = 0

function threeCheck(mod, thisSquare, color, score) {
  let nextSquare = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + mod);
  let prevSquare = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) - mod);

  if (thisSquare.contains === color && nextSquare && prevSquare && nextSquare.contains === color && prevSquare.contains === color) {
    score++
  }
  return score
}

function threeCheck2(mod, thisSquare, color) {
  let tally = 0
  let nextSquare = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + mod);
  let prevSquare = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) - mod);

  if (thisSquare.contains === color && nextSquare && prevSquare && nextSquare.contains === color && prevSquare.contains === color) {
    tally++
  }
  return tally
}

function squareCheck(thisSquare, score) {
  let tally = 0
  tally = threeCheck2(horizontalMod, thisSquare, 'white') +
  threeCheck2(verticalMod, thisSquare, 'white') +
  threeCheck2(diagDownMod, thisSquare, 'white') +
  threeCheck2(diagUpMod, thisSquare, 'white')
  console.log(`Tally = ${tally}`)
  if (tally === 4) {
    score -= 2
  }
  return score
}


function addWhiteScores(thisSquare) {
  whiteScore = threeCheck(horizontalMod, thisSquare, 'white', whiteScore)
  whiteScore = threeCheck(verticalMod, thisSquare, 'white', whiteScore)
  whiteScore = threeCheck(diagDownMod, thisSquare, 'white', whiteScore)
  whiteScore = threeCheck(diagUpMod, thisSquare, 'white', whiteScore)
  whiteScore = squareCheck(thisSquare, whiteScore)
  return whiteScore
}
function addBlackScores(thisSquare) {
  blackScore = threeCheck(horizontalMod, thisSquare, 'black', blackScore)
  blackScore = threeCheck(verticalMod, thisSquare, 'black', blackScore)
  blackScore = threeCheck(diagDownMod, thisSquare, 'black', blackScore)
  blackScore = threeCheck(diagUpMod, thisSquare, 'black', blackScore)
  blackScore = squareCheck(thisSquare, blackScore)
  return blackScore
}

function tallyScores() {
  for (const thisSquare of squareArray) {
    addWhiteScores(thisSquare);
    addBlackScores(thisSquare);
  }
  console.log(`Black: ${blackScore}`)
  console.log(`White: ${whiteScore}`)
}



// Check for four in a row (not complete)
// TODO: Finish four in a row logic and include diagonals
function fourCheckLoop(thisSquare) {
  // Make an empty array for each direction
  const fourCheckRightArray = [];
  const fourCheckLeftArray = [];
  const fourCheckUpArray = [];
  const fourCheckDownArray = [];
  const fourCheckDiagArrayLeftDown = [];
  const fourCheckDiagArrayLeftUp = [];
  const fourCheckDiagArrayRightDown = [];
  const fourCheckDiagArrayRightUp = [];

  // Check to the right
  for (i = 1; i < 4; i++) {
    squareRight = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + i )
    // If square right matches, add it to array. If not, stop looping.
    if (squareRight && squareRight.contains === thisSquare.contains) {
      fourCheckRightArray.push(squareRight)
    } else {
      break
    }
  }
  // Check to the left
  for (i = 1; i < 4; i++) {
    squareLeft = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) - i )
    // If square left matches, add it to array. If not, stop looping.
    if (squareLeft && squareLeft.contains === thisSquare.contains) {
      fourCheckLeftArray.push(squareLeft)
    } else {
      break
    }
  }
  // Check up
  for (i = 1; i < 4; i++) {
    squareUp = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) - (i * 10))
    // If square above matches, add it to array. If not, stop looping.
    if (squareUp && squareUp.contains === thisSquare.contains) {
      fourCheckUpArray.push(squareUp)
    } else {
      break
    }
  }
  // Check down
  for (i = 1; i < 4; i++) {
    squareDown = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + (i * 10))
    // If square below matches, add it to array. If not, stop looping.
    if (squareDown && squareDown.contains === thisSquare.contains) {
      fourCheckDownArray.push(squareDown)
    } else {
      break
    }
  }
  for (i = 1; i < 4; i++) {
    squareDiagRightDown = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + (i * 11))
    
    if (squareDiagRightDown && squareDiagRightDown.contains === thisSquare.contains) {
      fourCheckDiagArrayRightDown.push(squareDiagRightDown)
    } else {
      break
    }
  }
  for (i = 1; i < 4; i++) {
    squareDiagRightUp = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + (i * -11))
    
    if (squareDiagRightUp && squareDiagRightUp.contains === thisSquare.contains) {
      fourCheckDiagArrayRightUp.push(squareDiagRightUp)
    } else {
      break
    }
  }
  for (i = 1; i < 4; i++) {
    squareDiagLeftDown = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + (i * 9))
    
    if (squareDiagLeftDown && squareDiagLeftDown.contains === thisSquare.contains) {
      fourCheckDiagArrayLeftDown.push(squareDiagLeftDown)
    } else {
      break
    }
  }
  for (i = 1; i < 4; i++) {
    squareDiagLeftUp = squareArray.find(square => parseInt(square.squareNumber) === parseInt(thisSquare.squareNumber) + (i * -9))
    
    if (squareDiagLeftUp && squareDiagLeftUp.contains === thisSquare.contains) {
      fourCheckDiagArrayLeftUp.push(squareDiagLeftUp)
    } else {
      break
    }
  }
  // If direction checks on each side or above and below are 3 or more, do not place piece and continue player's turn
  if (fourCheckRightArray.length + fourCheckLeftArray.length >= 3 || fourCheckUpArray.length + fourCheckDownArray.length >= 3 || fourCheckDiagArrayLeftUp.length + fourCheckDiagArrayLeftDown.length >= 3 || fourCheckDiagArrayRightDown.length + fourCheckDiagArrayRightUp.length >= 3) {
    console.log('THAT\'S FOUR BRUH!!!')
    thisSquare.contains = 'empty'
    renderBoard()
    isWhiteTurn = !isWhiteTurn
    return
  }
  console.log(fourCheckRightArray, fourCheckLeftArray, fourCheckUpArray, fourCheckDownArray, fourCheckDiagArrayLeftUp, fourCheckDiagArrayLeftDown, fourCheckDiagArrayRightUp, fourCheckDiagArrayRightDown)
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
    // fourCheckLoop(thisSquare)
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
