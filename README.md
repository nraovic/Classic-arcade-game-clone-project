Frontend Nanodegree Classic Arcade Game Clone project
===============================

The goal of this project is to build **object-oriented** Frogger game including the player characters and enemies. The visual assets and a game loop engine are provided. 

## ES6
The game is build using ES6 features, and Babel is used to transpile the ES6 code to ES5. 

However, the game runs on the development versions of the app (_js/app.js_, _js/start.js_, _js/engine.js_), but the optimized code is also provided.

Transpiling code is done following the Babel CLI Setup - https://babeljs.io/docs/setup/#installation

The final version of the following files were transpiled (located in _src_ folder):
1. app.js
2. start.js

The transpiled code is located in _dist_ folder.


## How to run the game
You can run the game following the link: https://nraovic.github.io/Classic-arcade-game-clone-project/

Or:
1. Open _index.html_ 
2. Choose your character, insert your name and press _Let's start the game_ button (this will redirect you to _game.html_)

## How to play the game
* Use arrow keys to move right, left, up and down
* Your goal is to reach the water without colliding with the enemies
* When you reach the water, you will automatically be reset to the initail position
* In order to **win** you have to collect **60 points**, which equals reaching the water three times 
* You have three lives
