import {player as compPlayer} from "./Player.js";
import {Gameboard} from "./Gameboard.js"



export function placeShip(Gameboard, compPlayer, incIndex){
    let chooseAxis = Math.floor(Math.random() * 2);
    let headX = Math.floor(Math.random() * 10);
    let headY = Math.floor(Math.random() * 10);
    let head = Gameboard.board[headX][headY];
    let isValid = true;
    let currIndex = parseInt(incIndex);
    if(chooseAxis == 0){ //handles X axis placement
        for(let i = headX; i < ((compPlayer.playerShips[currIndex].length) + headX); i++){
            if (i > 9){
                isValid = false;
                break;
            }
            if(Gameboard.board[headY][i] != 0){
                isValid = false;
                break;
            }
        }

        if(isValid == true){
            for(let i = headX; i < (compPlayer.playerShips[currIndex].length); i++){
                Gameboard.board[headY][i] = 1;
                console.log("X move played" + "X = " + headY + " Y = " + i);
            }
            //console.log("X move played" + "X = " + headY + " Y = " + i);
        } else {
            return false;
        }
    } else {
        for(let i = headY; i < (compPlayer.playerShips[currIndex].length + headY); i++){
            if(i > 9){
                isValid = false;
                break;
            }
            if(Gameboard.board[i][headX] != 0 || Gameboard.board[i][headX] == undefined){
                isValid = false;
                break;
            }
        }

        if(isValid == true){
            for(let i = headY; i < (compPlayer.playerShips[currIndex].length); i++){
                Gameboard.board[i][headX] = 1;
                console.log("Y move played. X= " + i + " Y= " + headX);
            }
            //console.log("Y move played. X= " + i + " Y= " + headX);
        } else {
            return false;
        }
    }
    return Gameboard;
}