import { ship as shipFactory } from "./Ship.js";
import { Gameboard as gameboardFactory } from "./Gameboard.js";
import { player as playerFactory } from "./Player.js";

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

//boards created. Now we will handle placing the boats on the board.

let carrier = player.playerShips[0];

let currAxis = true;
let axisBtn = document.getElementById("axis");

axisBtn.addEventListener("click", () => {
  if (currAxis) {
    currAxis = false;
    axisBtn.innerHTML = "Y-Axis";
  } else {
    currAxis = true;
    axisBtn.innerHTML = "X-Axis";
  }
});

let tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) => {
  tile.addEventListener("mouseenter", () => {
    if (currAxis) {
      ///FIX INDENTIONS HERE
      
      let headTile = tile;
      let getX = headTile.getAttribute("x");
      let getY = headTile.getAttribute("y");
      let tailX = 0;
      tailX = parseInt(getX) + carrier.length;
      let isSpace = true;
      let validMove = null;

      if (tailX < 11) {
        isSpace = true;
      } else {
        isSpace = false;
      }
      if (isSpace) {
        validMove = true;
        tile.style.backgroundColor = "yellow";
        for (let i = 1; i < carrier.length; i++) {
          tile.nextSibling.style.backgroundColor = "yellow";
          tile = tile.nextSibling;
        }
      } else {
        validMove = false;
        tile.style.backgroundColor = "red";
        let counter = parseInt(getX);
        while (tile.nextSibling && counter < 9) {
          tile.nextSibling.style.backgroundColor = "red";
          tile = tile.nextSibling;
          counter += 1;
        }
      }
    } else {
      tile.style.backgroundColor = "yellow";
      let headTile = tile;
      let getX = headTile.getAttribute("x");
      let getY = parseInt(headTile.getAttribute("y"));
      let tail = getY + carrier.length;
      let isSpace = true;
      let validMove = null;
      if (tail < 11) {
        isSpace = true;
      } else {
        isSpace = false;
      }
      if (isSpace) {
        validMove = true;
        let currXrow = document.querySelectorAll('[x ="' + getX + '"]');

        let tilesColored = 0;
        currXrow.forEach((row) => {
          if (
            parseInt(row.getAttribute("y")) > getY &&
            parseInt(row.getAttribute("y")) < 10 &&
            row.classList.contains("tile") &&
            tilesColored < carrier.length - 1
          ) {
            row.style.backgroundColor = "yellow";
            tilesColored += 1;
          }
        });
      } else {
        validMove = false;
        let currXrow = document.querySelectorAll('[x ="' + getX + '"]');

        currXrow.forEach((row) => {
          let parsedY = parseInt(row.getAttribute("y"));
          if (
            parsedY < 10 &&
            parsedY >= getY &&
            row.classList.contains("tile")
          ) {
            row.style.backgroundColor = "red";
          }
        });
      }
    }
  });
  tile.addEventListener("mouseleave", () => {
    if (currAxis) {
      //FIX INDENTIONS HERE
      tile.style.backgroundColor = "aqua";
      let headTile = tile;
      let getX = headTile.getAttribute("x");
      let getY = headTile.getAttribute("y");
      let tailX = 0;
      tailX = parseInt(getX) + carrier.length;
      let isSpace = true;

      if (tailX < 10) {
        isSpace = true;
      } else {
        isSpace = false;
      }

      if (tile.previousSibling) {
        let prevColor = tile.previousSibling.style.backgroundColor;
        while (prevColor == "yellow" || prevColor == "red") {
          tile.previousSibling.style.backgroundColor = "aqua";
          tile = tile.previousSibling;

          try {
            prevColor = tile.previousSibling.style.backgroundColor;
          } catch (error) {
            break;
          }
        }
      }
    } else {
      
      let headTile = tile;
      let getX = headTile.getAttribute("x");
      let getY = parseInt(headTile.getAttribute("y"));
      let tail = getY + carrier.length;
      let isSpace = true;

      if (tail < 11) {
        isSpace = true;
      } else {
        isSpace = false;
      }
      let currXrow = document.querySelectorAll('[x ="' + getX + '"]');
      let tilesColored = 0;
      currXrow.forEach((row) => {
        if (
          parseInt(row.getAttribute("y")) >= getY &&
          parseInt(row.getAttribute("y")) < 10 &&
          row.classList.contains("tile") &&
          tilesColored < carrier.length
        ) {
          row.style.backgroundColor = "aqua";
          tilesColored+=1;
        }
      });
    }
  });
});
