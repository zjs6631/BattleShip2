

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

    let misses = [];
    const receiveAttack = (x, y) => { 
        let validMove = true;
        if(board[x][y] == 0){
            board[x][y] = 2;
            let miss = [x, y];
            misses.push(miss);
            valueMove = true;
        } else if (board[x][y] == 1){
            board[x][y] = 3;
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

    return{ shipCount, board, misses, receiveAttack, checkShips};
};

//if(module.exports){
 //   module.exports = Gameboard;
//}
