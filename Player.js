import {ship as ship} from "./Ship.js"

export const player = () => {
    let carrierShip = ship(5, false);
    let battleship = ship(4, false);
    let cruiser = ship(3, false);
    let destroyer = ship(2, false);
    let playerShips = [carrierShip, battleship, cruiser, destroyer];

    return {playerShips};
}


//module.exports = player;


