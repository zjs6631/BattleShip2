

export const Gameboard = () => {
    let shipCount = 4;
    //USING 2D ARRAY TO REPRESENT GAMEBOARD
    //if arr[x][y] == 0 then noship no miss, == 1 then ship nohit, ==2 then noship miss, ==3 then shit hit
    let board = [[0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0]];

    let shots = [];
    
    const receiveAttack = (arr) => { 
        let x = parseInt(arr[1]);
        let y = parseInt(arr[0]);

        let validMove = true;
        if(board[x][y] == 0){
            board[x][y] = 3;
            let miss = [x, y];
            shots.push(miss);
            validMove = true;
        } else if (board[x][y] == 1){
            board[x][y] = 2;
            let hit = [x, y];
            shots.push(hit);
            validMove = true;
        } else {
            validMove = false;
        }
        return validMove;
    }

    const checkShips = () => {
        if(shipCount == 0){
            return false;
        } else {
            return true;
        }
    }

    const reduceShips = () =>{
        shipCount-=1;
    }

    return{ shipCount, board, shots, receiveAttack, checkShips, reduceShips};
};

//if(module.exports){
 //   module.exports = Gameboard;
//}
