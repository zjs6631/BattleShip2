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
        console.log("ship length during " + incIndex +" index = " +(compPlayer.playerShips[currIndex].length))
        for(let i = headY; i < (((compPlayer.playerShips[currIndex].length) + (headY))); i++){
            if (i > 9){
                console.log("invalid length of" +i +"on x-axis");
                isValid = false;
                break;
            }
            if(Gameboard.board[headY][i] != 0){
                console.log("value other than 0 encountered on x axis");
                isValid = false;
                break;
            }
        }

        if(isValid == true){
            for(let i = headY; i < (((compPlayer.playerShips[currIndex].length) + (headY))); i++){

                Gameboard.board[headY][i] = 1;
                console.log("X move played" + "X = " + headY + " Y = " + i);
            }
            console.log("ship " + incIndex + "placed!X");
            //console.log("X move played" + "X = " + headY + " Y = " + i);
        } else {
            placeShip(Gameboard, compPlayer, incIndex);
        }
    } else {
        console.log("ship length during " + incIndex +" index = " +(compPlayer.playerShips[currIndex].length))
        for(let i = headY; i < (((compPlayer.playerShips[currIndex].length) + (headY))); i++){
            if(i > 9){
                console.log("invalid length of " + i + " on y axis");
                isValid = false;
                break;
            }
            if(Gameboard.board[i][headX] != 0 || Gameboard.board[i][headX] == undefined){
                console.log("value other than 0 encountered on  Y axis");
                isValid = false;
                break;
            }
        }

        if(isValid == true){
            for(let i = headY; i < (((compPlayer.playerShips[currIndex].length) + (headY))); i++){
                Gameboard.board[i][headX] = 1;
                console.log("Y move played. X= " + i + " Y= " + headX);
            }
            console.log("ship " + incIndex + "placed!Y");
            //console.log("Y move played. X= " + i + " Y= " + headX);
        } else {
            placeShip(Gameboard, compPlayer, incIndex);
        }
    }
    return;
}