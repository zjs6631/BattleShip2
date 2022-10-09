
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
        tile.setAttribute('x', i);
        tile.setAttribute('y', j);
        visualPboard.appendChild(tile);
        
    }
}

for(let i = 0; i < computerBoard.board.length; i++){
    for(let j = 0; j < computerBoard.board[i].length; j++){

        let tile = document.createElement('div');
        tile.classList = 'tile';
        tile.setAttribute('x', i);
        tile.setAttribute('y', j);
        visualCboard.appendChild(tile);
        
    }
}