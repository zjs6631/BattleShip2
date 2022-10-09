
import {ship as shipFactory} from "./Ship.js";
import { Gameboard as gameboardFactory } from "./Gameboard.js";
import {player as playerFactory} from "./Player.js";

let player = playerFactory();
let computer = playerFactory();

let playerBoard = gameboardFactory();
let computerBoard = gameboardFactory();

let visualPboard = document.getElementById('playerBoard');
let visualCboard = document.getElementById('computerBoard');
// nested loop to create a 10x10 grid and assign x/y variable values to each tile to use for game logic
//implementation
for(let i = 0; i < playerBoard.board.length; i++){
    for(let j = 0; j < playerBoard.board[i].length; j++){

        let tile = document.createElement('div');
        tile.classList = 'tile';
        tile.setAttribute('x', j);
        tile.setAttribute('y', i);
        
        visualPboard.appendChild(tile);
        
    }
}

for(let i = 0; i < computerBoard.board.length; i++){
    for(let j = 0; j < computerBoard.board[i].length; j++){

        let tile = document.createElement('div');
        tile.classList = 'tile';
        tile.setAttribute('x', j);
        tile.setAttribute('y', i);
        visualCboard.appendChild(tile);
        
    }
}


//boards created. Now we will handle placing the boats on the board.

let carrier = player.playerShips[0];
console.log(carrier.length);

let tiles = document.querySelectorAll('.tile');
tiles.forEach(tile =>{
    tile.addEventListener("mouseenter", () =>{
        tile.style.backgroundColor = "yellow";
        let headTile = tile;
        let getX = headTile.getAttribute("x");
        let getY = headTile.getAttribute("y");
        let tailX = 0;
        tailX = parseInt(getX) + carrier.length;
        let isSpace = true;
        console.log(tailX);
        if(tailX < 11){
            isSpace = true;
        } else {
            isSpace = false;
        }
        if(isSpace){
            for(let i = 1; i < carrier.length; i++){
                tile.nextSibling.style.backgroundColor = "yellow";
                tile = tile.nextSibling;
            }
        } else {
            let counter = parseInt(getX);
            while(tile.nextSibling && counter < 9){
                
                tile.nextSibling.style.backgroundColor = "yellow";
                tile = tile.nextSibling;
                counter +=1;
                
            }
        }
        
    })
    tile.addEventListener("mouseleave", () =>{
        tile.style.backgroundColor = "aqua";
        let headTile = tile;
        let getX = headTile.getAttribute("x");
        let getY = headTile.getAttribute("y");
        let tailX = 0;
        tailX = parseInt(getX) + carrier.length;
        let isSpace = true;
        console.log(tailX);
        if(tailX < 10){
            isSpace = true;
        } else {
            isSpace = false;
        }
        
        if(tile.previousSibling){
            let prevColor = tile.previousSibling.style.backgroundColor;
            while(prevColor == "yellow"){
                tile.previousSibling.style.backgroundColor = "aqua";
                tile = tile.previousSibling;
                prevColor = tile.previousSibling.style.backgroundColor;
            }
            
        }
       
    })
})




