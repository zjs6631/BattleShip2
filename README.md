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


