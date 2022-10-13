//factory to create ships for battleship game

export const ship = (length, sunk) => {
    let hits = 0
    
    let shipCoords = [];
    let isSunk = () => {
        if(length == hits){
            return true;
        } else {
            return false;
        }
    }

    let isHit = () => {
        hits +=1;
        return hits;
    }

    

    return { length, sunk, isSunk, isHit, hits, shipCoords};
};


//module.exports = ship;
