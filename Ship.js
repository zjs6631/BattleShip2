//factory to create ships for battleship game

export const ship = (length, sunk) => {
    let hits = 0
    let xAxis = true;
    const isSunk = () => {
        if(length == hits){
            sunk = true;
            return true;
        } else {
            return false;
        }
    }

    const isHit = () => {
        hits +=1;
        return hits;
    }

    

    return { length, sunk, isSunk, isHit, hits};
};


//module.exports = ship;
