//base class
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function getRandomFromArray(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}
//modal
const dialogFunc = function(insertText) {
    const dialog = document.createElement('div');
    dialog.id = "dialog-confirm";
    const text = document.createElement('p');
    text.textContent = insertText;
    dialog.appendChild(text);
    document.body.appendChild(dialog);
    $(function () {
        $("#dialog-confirm").dialog({
            closeOnEscape: false,
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Yes": function () {
                    window.location.reload(true);
                },
                "No, thanks": function () {
                    window.open("index.html", "_self");
                }
            }
        });
    });
}

//player's name
const playerName = document.getElementById('name');
playerName.textContent = `PLAYER: ${sessionStorage.getItem('charName')}`;

//lives
const lives = document.querySelector('.lives');
let livesValue = 3;
lives.textContent = `Life(s) left: ${livesValue}`;

//score
const score = document.querySelector('.score');
let scoreValue = 0;
score.textContent = `Score: ${scoreValue}/60`;

class GameObject {
    constructor(sprite, x, y, height, width) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}


class Enemy extends GameObject {
    constructor(sprite = 'images/enemy-bug.png', x = -100, y = getRandomFromArray([60, 143, 223]), height = 67, width = 80, speedX = getRandomInt(200, 500), delay = getRandomInt(0, 3000)) {
        super(sprite, x, y, height, width);
        this.speedX = speedX;
        this.delay = delay;
    }
  
    update(dt) {
        this.x += this.speedX*dt;
    }
    collision() {
        if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        // Collision detected! Reset the player to the initial postion.
            player.x = 202;
            player.y = 410;
            //update number of lives??? do I put it here??
            livesValue = livesValue - 1;
            console.log(livesValue);
            lives.textContent = `Life(s) left: ${livesValue}`;
            //dialog box
            if(livesValue === 0) {
                dialogFunc('Game over! :( Do you want to play again?');
            }

        }
    
    }
}

const colStep = 83; //player's step on the y coordinate
const rowStep = 101; //player's step on the x coordinate

class Player extends GameObject {
    constructor(sprite = sessionStorage.getItem('sprite'), x = 202, y = 410, height = 50, width = 50) {
        super(sprite, x, y, height, width);
        console.log(sprite);
    }

    handleInput(key) {



        //player is allowed to move 5 steps up and 2 steps on each side from it's initial position (202, 410)

        const boundaries = [202 - rowStep*2, 410 - 5*colStep, 202 + 2*rowStep, 410];
        const [leftBoundary, topBoundary, rightBoundary, bottomBoundary] = boundaries;

        if (key === 'left') {
            //first check how far the player is from the canvas' edge
            if (this.x > leftBoundary) {
                //then move
                this.x = this.x - rowStep;
            }
        } else if (key ==='up') {
            if (this.y > topBoundary) {
                this.y = this.y - colStep;
            }
        } else if (key === 'right') {
            if (this.x < rightBoundary) {
                this.x = this.x + rowStep;
            }
        } else if (key === 'down') {
            if (this.y < bottomBoundary) {
                this.y = this.y + colStep;
            }
        }
    }
    update() {
        //reset players's position when it reaches the water
        //add 20 to the score
        if (this.y === 410 - 5 * colStep) {
            player.y = 410; 
            player.x = 202;
            scoreValue = scoreValue + 20;
            score.textContent = `Score: ${scoreValue}/60`;
            //dialog box
            if (scoreValue === 60) {
                dialogFunc('Congratulations! You won! Do you want to play again?');
            }
        }
    }
}



/*
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.speedX = getRandomInt(200, 300); // sta je ovo?? kako se odredjuje brzina??
    //speed - randomly chosen from a set of speeds - create the set

    this.speedY = 0;
    this.delay = getRandomInt(0, 3000);
    //this.x always 0
    this.x = -100;//enemies are hidden before they start going
    //this.y set of coordinates [60, 143, 223]
    let yCoordinates = [60, 143, 223];
    this.y = getRandomFromArray(yCoordinates); //koordinate? 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speedX*dt;
    this.y += this.speedY*dt; 
    this.height = 67;
    this.width = 80;
    //
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 410;
    this.height = 50;
    this.width = 50;
};
Player.prototype.update = function(dt) {    

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    //while(this.x > 200-2*83 &&)
    if (key === 'left') {
        //check if the player is inside the canvas and have enough space to move forward
        if (this.x > 200-2*83) {
            this.x = this.x - 100;
        }
    } else if (key ==='up') {
        if (this.y > 410-5*83) {
            this.y = this.y - 83;
        }    
    } else if (key === 'right') {
        if (this.x < 200+2*83) {
            this.x = this.x + 100;
        }
    } else if (key === 'down') {
        if (this.y < 410) {
            this.y = this.y + 83;
        }
    }
};

Enemy.prototype.collision = function() {
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        // collision detected!
        player.x = 200;
        player.y = 410;
    }
};

// This class requires an update(), render() and
// a handleInput() method.
*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const enemy5 = new Enemy();


let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// Place the player object in a variable called player
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});