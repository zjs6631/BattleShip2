# BattleShip2
This is a second attempt at developing battleship the popular board game. I believe I initialized the previous project incorrectly, so I am testing if this will solve thoses issues.

-------------------------------------------------------------------------
HOW TO GET JEST STARTED IN A NEW PROJECT:
/////
USE npm init WHEN STARTING PROJECT TO CREATE THE 
package.json FILE!!!!!!!!!!!!!!!!
1. ADD TO THE package.json file:
            {
               "scripts": {
                    "tests": "jest",
                    "watch": "jest --watchAll"
                }
            }
/////This should add node_modules to the project? should also add package-lock.json
2. Run "npm install --save-dev jest"

/////This will allow for the use of module.exports since import/export statements not currently supported
 RUN THIS RUN THIS RUN THIS --->      npm install --save-dev @babel/preset-env
3. Create a babel.config.js and add: 
        module.exports = {
            presets: [['@babel/preset-env', {targets: { node: 'current'}}]],
        };
---------------------------------------------------------------------------------

10/9/2022 -- UPDATE ON SOLUTION TO IMPORT STATEMENTS --

The whole point of using babel in this project is so I can use import/export in my test suite.
Jest wont allow you to use ES6 syntax out of the box 
module.exports doesn't work when working in a browser environment either, so this complicated things.

Simply converting to import/export statements throughout the application seemed to have solved my issues


SHIFT + ALT + F to auto indent code.

10/9/2022 11:01PM notes for tomorrow:
I was able to get the tile color changes to function. AND they now turn red when there is not enough alloted space. I will have to look into using some form of loop to control the length being used to figure out how many squares to color.

First I need to add a click event listener where if headTiles color == "yellow" then I
can allow the player to place a ship

This will cause more issue with making sure players place ships in valid positions/no overlapping and such. 

once I get the ships placed on the board I will start figuring out how to let the computer place ships on the board randomly. Maybe get a random number (0-1) to determine axis and then a random number (0-9) to choose tile to place ship. Repeat this process until 5 ships are places. 


