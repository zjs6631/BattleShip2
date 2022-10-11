import { ship as shipFactory } from "./Ship.js";
import { Gameboard as gameboardFactory } from "./Gameboard.js";
import { player as playerFactory } from "./Player.js";
import { placeShip } from "./computerPlays.js";

let player = playerFactory();
let computer = playerFactory();

let playerBoard = gameboardFactory();
let computerBoard = gameboardFactory();

let visualPboard = document.getElementById("playerBoard");
let visualCboard = document.getElementById("computerBoard");
// nested loop to create a 10x10 grid and assign x/y variable values to each tile to use for game logic
//implementation
for (let i = 0; i < playerBoard.board.length; i++) {
  for (let j = 0; j < playerBoard.board[i].length; j++) {
    let tile = document.createElement("div");
    tile.classList = "tile";
    tile.setAttribute("x", j);
    tile.setAttribute("y", i);
    tile.setAttribute("isActive", "true");

    visualPboard.appendChild(tile);
  }
}

for (let i = 0; i < computerBoard.board.length; i++) {
  for (let j = 0; j < computerBoard.board[i].length; j++) {
    let tile = document.createElement("div");
    tile.classList = "comptile";
    tile.setAttribute("x", j);
    tile.setAttribute("y", i);
    visualCboard.appendChild(tile);
  }
}

console.log(computer.playerShips.length);
for (let i = 0; i < computer.playerShips.length; i++) {
  console.log("loop--->" + i);
  placeShip(computerBoard, computer, i);
}

console.log(computerBoard.board);

//boards created. Now we will handle placing the boats on the board.

let currShipIndex = 0;

let currAxis = true; //currAxis true means that the button is set to X axis option
let axisBtn = document.getElementById("axis"); //grab the button

axisBtn.addEventListener("click", () => {
  if (currAxis) {
    currAxis = false;
    axisBtn.innerHTML = "Y-Axis";
  } else {
    currAxis = true;
    axisBtn.innerHTML = "X-Axis";
  }
});

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ADDING SOME SPACE BETWEEN GRID EVENT LISTENERS AND CODE ABOVE

MAKING THE GRID WORK PROPERLY INVOLVED A LOT OF CODE THAT I WILL CONTINUE TO REFACTOR LATER
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/
//tiles returns a list of all of our tile divs
let tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) => {
  //we can then use forEach to add eventListeners to each individual div

  tile.addEventListener("mouseenter", () => {
    let currShipToPlace = player.playerShips[currShipIndex];
    if (currShipIndex < player.playerShips.length) {
      if (currAxis) {
        //set a headTile and pull the x and y values from that tile (keeps a starting point)
        let headTile = tile;
        let getX = headTile.getAttribute("x");
        let getY = headTile.getAttribute("y");
        let tailX = 0; //set a tailX variable to be the headtiles starting x value + length of boat
        tailX = parseInt(getX) + currShipToPlace.length;
        let isSpace = true; //bool to test if space for boat is available
        let validMove = null; //validMode will control game logic

        if (tailX < 11) {
          //if our tail x value was greater than 10 then there is not enough room
          isSpace = true;
        } else {
          isSpace = false;
        }

        if (isSpace && tile.getAttribute("isActive") == "true") {
          //if we had enough space on the board
          validMove = true; //valid move
          tile.style.backgroundColor = "yellow"; //make current tile yellow

          //loop through for the length of the boat and make squares yellow
          for (let i = 1; i < currShipToPlace.length; i++) {
            if (tile.nextSibling.getAttribute("isActive") == "true") {
              tile.nextSibling.style.backgroundColor = "yellow";
              tile = tile.nextSibling; //using nextSibling is similar to node traversals
            } else {
              while (tile.style.backgroundColor == "yellow") {
                tile.style.backgroundColor = "aqua";
                tile = tile.previousSibling;
              }
              break;
            }
          }
        } else if (!isSpace && tile.getAttribute("isActive") == "true") {
          //IF NO SPACE
          validMove = false; //not valid move and make squares red until we reach the maximum x value
          //tile.style.backgroundColor = "red";
          let counter = parseInt(getX);
          while (tile.nextSibling && counter < 9) {
            if (tile.nextSibling.getAttribute("isActive") == "true") {
              tile.nextSibling.style.backgroundColor = "red";
            }
            tile = tile.nextSibling;
            counter += 1;
          }
        }
      } else {
        //HANDLES Y AXIS

        let headTile = tile;
        let getX = headTile.getAttribute("x");
        let getY = parseInt(headTile.getAttribute("y"));
        let tail = getY + currShipToPlace.length - 1;
        let isSpace = true;
        let validMove = null;
        if (tail < 10) {
          isSpace = true;
        } else {
          isSpace = false;
        }
        if (isSpace) {
          //if we have space move is valid
          validMove = true;
          let currXrow = document.querySelectorAll('[x ="' + getX + '"]');
          //using querySelectorAll to grab all elements with x value matching current tile
          let tilesColored = 0;
          let allValid = true;
          currXrow.forEach((row) => {
            if (
              parseInt(row.getAttribute("y")) >= getY &&
              parseInt(row.getAttribute("y")) <= tail &&
              row.classList.contains("tile") &&
              row.getAttribute("isActive") == "false"
            ) {
              allValid = false;
              //tile.style.backgroundColor = "red";
            } else {
              //tile.style.backgroundColor = "yellow";
            }
          });

          //loop through node list of values
          currXrow.forEach((row) => {
            if (
              //if curr y value > heads y value && < 10 && on player board && tileColor counter < ships length color the block
              parseInt(row.getAttribute("y")) >= getY &&
              parseInt(row.getAttribute("y")) < 10 &&
              row.classList.contains("tile") &&
              tilesColored < currShipToPlace.length &&
              allValid == true
            ) {
              row.style.backgroundColor = "yellow";
              tilesColored += 1;
            } else if (
              parseInt(row.getAttribute("y")) >= getY &&
              parseInt(row.getAttribute("y")) <= tail &&
              row.classList.contains("tile") &&
              tilesColored < currShipToPlace.length - 1 &&
              allValid == false
            ) {
              if (row.getAttribute("isActive") == "true") {
                row.style.backgroundColor = "red";
              }
            }
          });
        } else {
          //if invalid move then color the blocks red until you get to end of column
          validMove = false;
          let currXrow = document.querySelectorAll('[x ="' + getX + '"]');

          currXrow.forEach((row) => {
            let parsedY = parseInt(row.getAttribute("y"));
            if (
              parsedY < 11 &&
              parsedY >= getY &&
              row.classList.contains("tile") &&
              row.style.backgroundColor == "aqua"
            ) {
              row.style.backgroundColor = "red";
            }
          });
        }
      }
    }
  });
  //MOUSELEAVE TO HANDLE COLORING BACK TO BLUE
  tile.addEventListener("mouseleave", () => {
    let currShipToPlace = player.playerShips[currShipIndex];
    if (currShipIndex < player.playerShips.length) {
      if (currAxis) {
        //for x axis
        if (tile.getAttribute("isActive") == "true") {
          tile.style.backgroundColor = "aqua";
        }
        let headTile = tile;
        let getX = headTile.getAttribute("x");
        let getY = headTile.getAttribute("y");
        let tailX = 0;
        tailX = parseInt(getX) + currShipToPlace.length;
        let isSpace = true;

        if (tailX < 10) {
          isSpace = true;
        } else {
          isSpace = false;
        }
        //go through previous siblings and change to aqua until an aqua block is encountered
        if (
          tile.previousSibling &&
          tile.previousSibling.getAttribute("isActive") == "true"
        ) {
          let prevColor = tile.previousSibling.style.backgroundColor;
          while (
            (prevColor == "yellow" || prevColor == "red") &&
            tile.previousSibling.getAttribute("isActive") == "true"
          ) {
            tile.previousSibling.style.backgroundColor = "aqua";
            tile = tile.previousSibling;

            try {
              //try catch prevents error message when cursor leaves 1st tile in grid
              prevColor = tile.previousSibling.style.backgroundColor;
            } catch (error) {
              break;
            }
          }
        }
      } else {
        //for Y axis
        let headTile = tile;
        let getX = headTile.getAttribute("x");
        let getY = parseInt(headTile.getAttribute("y"));
        let tail = getY + currShipToPlace.length;
        let isSpace = true;

        if (tail < 11) {
          isSpace = true;
        } else {
          isSpace = false;
        }
        let currXrow = document.querySelectorAll('[x ="' + getX + '"]');
        let tilesColored = 0;
        let isValid = true;

        currXrow.forEach((row) => {
          if (
            parseInt(row.getAttribute("y")) > getY &&
            parseInt(row.getAttribute("y")) < 10 &&
            row.classList.contains("tile") &&
            row.getAttribute("isActive") == "false"
          ) {
            isValid = false;
          }
        });

        currXrow.forEach((row) => {
          //use our forEach to get node list of divs with matching x values
          if (
            //if their y values are within the range and they are player tiles color them aqua
            parseInt(row.getAttribute("y")) >= getY &&
            parseInt(row.getAttribute("y")) < 10 &&
            row.classList.contains("tile") &&
            tilesColored < currShipToPlace.length &&
            (row.style.backgroundColor == "yellow" ||
              row.style.backgroundColor == "red")
          ) {
            row.style.backgroundColor = "aqua";
            tilesColored += 1;
          }
        });
      }
    }
  });

  //EVENTLISTENER "CLICK"
  tile.addEventListener("click", () => {
    let currShipToPlace = player.playerShips[currShipIndex];

    if (
      tile.style.backgroundColor == "yellow" &&
      currAxis &&
      currShipIndex < player.playerShips.length
    ) {
      let len = currShipToPlace.length;
      while (len != 1) {
        tile = tile.previousSibling;
        len -= 1;
      }
      tile.style.backgroundColor = "gray"; //make current tile yellow
      tile.setAttribute("isActive", "false");
      let firstTilesX = parseInt(tile.getAttribute("x"));
      let firstTilesY = parseInt(tile.getAttribute("y"));
      playerBoard.board[firstTilesY][firstTilesX] = 1;

      //loop through for the length of the boat and make squares yellow
      for (let i = 1; i < currShipToPlace.length; i++) {
        let nextX = parseInt(tile.nextSibling.getAttribute("x"));
        let nextY = parseInt(tile.nextSibling.getAttribute("y"));
        playerBoard.board[nextY][nextX] = 1;
        tile.nextSibling.style.backgroundColor = "gray";
        tile.nextSibling.setAttribute("isActive", "false");
        tile = tile.nextSibling; //using nextSibling is similar to node traversals
      }
      currShipIndex += 1;
      console.log(playerBoard.board);
    } else if (
      tile.style.backgroundColor == "yellow" &&
      !currAxis &&
      currShipIndex < player.playerShips.length
    ) {
      let headTile = tile;
      let startX = headTile.getAttribute("x");
      let startY = parseInt(headTile.getAttribute("y"));
      let tailY = currShipToPlace.length - 1 + startY;
      let currXrow = document.querySelectorAll('[x ="' + startX + '"]');
      currXrow.forEach((currTile) => {
        let currTileY = parseInt(currTile.getAttribute("y"));
        if (
          currTileY >= startY &&
          currTileY <= tailY &&
          currTile.getAttribute("isActive") == "true"
        ) {
          let currX = parseInt(currTile.getAttribute("x"));
          let currY = parseInt(currTile.getAttribute("y"));
          playerBoard.board[currY][currX] = 1;
          currTile.style.backgroundColor = "gray";
          currTile.setAttribute("isActive", "false");
        }
      });
      currShipIndex += 1;
      console.log(playerBoard.board);
    }
  });
});
