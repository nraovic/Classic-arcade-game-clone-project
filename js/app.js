//helper functions
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomFromArray(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}
//dialog - pops up when the game is over or won
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

//Set the player's name, score and number of lives to show up on the screen
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


//Base class - superclass
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
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update(dt) {
        this.x += this.speedX * dt;
    }
    collision() {
        if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        // Collision detected! Reset the player to the initial postion and update the number of lives left
            player.x = 202;
            player.y = 410;
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
        //player is allowed to move 5 steps up and 2 steps on the each side from it's initial position (202, 410)
        const boundaries = [202 - rowStep*2, 410 - 5*colStep, 202 + 2*rowStep, 410];
        const [leftBoundary, topBoundary, rightBoundary, bottomBoundary] = boundaries;

        if (key === 'left') {
            //first check how far the player is from the boundary and then move
            if (this.x > leftBoundary) {
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
        //reset players's position when it reaches the water and update the score value
        if (this.y === 410 - 5 * colStep) {
            player.y = 410; 
            player.x = 202;
            scoreValue += 20;
            score.textContent = `Score: ${scoreValue}/60`;
            //dialog box
            if (scoreValue === 60) {
                dialogFunc('Congratulations! You won! Do you want to play again?');
            }
        }
    }
}

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