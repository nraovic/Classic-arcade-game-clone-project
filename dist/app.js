'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var dialogFunc = function dialogFunc(firstLine, secondLine) {
    var dialog = document.createElement('div');
    dialog.id = "dialog-confirm";
    document.body.appendChild(dialog);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var argument = _step.value;

            var line = document.createElement('p');
            line.textContent = argument;
            dialog.appendChild(line);
        }

        //source code for the function: https://jqueryui.com/dialog/#modal-confirmation
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    $(function () {
        $('#dialog-confirm').dialog({
            closeOnEscape: false,
            resizable: false,
            height: 'auto',
            width: 400,
            modal: true,
            buttons: {
                'Yes': function Yes() {
                    window.location.reload(true);
                },
                'No, thanks': function NoThanks() {
                    window.open('index.html', '_self');
                }
            }
        });
    });
};

//Set the player's name, score and number of lives to show up on the screen
//player's name
var playerName = document.getElementById('name');
playerName.textContent = 'PLAYER: ' + sessionStorage.getItem('charName');

//lives
var lives = document.querySelector('.lives');
var livesValue = 3;
lives.textContent = 'Life(s) left: ' + livesValue;

//score
var score = document.querySelector('.score');
var scoreValue = 0;
score.textContent = 'Score: ' + scoreValue + '/60';

//Base class - superclass

var GameObject = function () {
    function GameObject(sprite, x, y, height, width) {
        _classCallCheck(this, GameObject);

        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    _createClass(GameObject, [{
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }]);

    return GameObject;
}();

var Enemy = function (_GameObject) {
    _inherits(Enemy, _GameObject);

    function Enemy() {
        var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'images/enemy-bug.png';
        var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -100;
        var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getRandomFromArray([60, 143, 223]);
        var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 67;
        var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 80;
        var speedX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : getRandomInt(200, 500);
        var delay = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : getRandomInt(0, 3000);

        _classCallCheck(this, Enemy);

        var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, sprite, x, y, height, width));

        _this.speedX = speedX;
        _this.delay = delay;
        return _this;
    }
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    _createClass(Enemy, [{
        key: 'update',
        value: function update(dt) {
            this.x += this.speedX * dt;
        }
    }, {
        key: 'collision',
        value: function collision() {
            if (this.x < player.x + player.width && this.x + this.width > player.x && this.y < player.y + player.height && this.height + this.y > player.y) {
                // Collision detected! Reset the player to the initial postion and update the number of lives left
                player.x = 202;
                player.y = 410;
                livesValue = livesValue - 1;
                console.log(livesValue);
                lives.textContent = 'Life(s) left: ' + livesValue;
                //dialog box
                if (livesValue === 0) {
                    dialogFunc('GAME OVER! :-(', 'Do you want to play again?');
                }
            }
        }
    }]);

    return Enemy;
}(GameObject);

var colStep = 83; //player's step on the y coordinate
var rowStep = 101; //player's step on the x coordinate

var Player = function (_GameObject2) {
    _inherits(Player, _GameObject2);

    function Player() {
        var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : sessionStorage.getItem('sprite');
        var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 202;
        var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 410;
        var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
        var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;

        _classCallCheck(this, Player);

        var _this2 = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, sprite, x, y, height, width));

        console.log(sprite);
        return _this2;
    }

    _createClass(Player, [{
        key: 'handleInput',
        value: function handleInput(key) {
            //player is allowed to move 5 steps up and 2 steps on the each side from its initial position (202, 410)
            var boundaries = [202 - rowStep * 2, 410 - 5 * colStep, 202 + 2 * rowStep, 410];
            var leftBoundary = boundaries[0],
                topBoundary = boundaries[1],
                rightBoundary = boundaries[2],
                bottomBoundary = boundaries[3];


            if (key === 'left') {
                //first check how far the player is from the boundary and then move
                if (this.x > leftBoundary) {
                    this.x = this.x - rowStep;
                }
            } else if (key === 'up') {
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
    }, {
        key: 'update',
        value: function update() {
            //reset players's position when it reaches the water and update the score value
            if (this.y === 410 - 5 * colStep) {
                player.y = 410;
                player.x = 202;
                scoreValue += 20;
                score.textContent = 'Score: ' + scoreValue + '/60';
                //dialog box
                if (scoreValue === 60) {
                    dialogFunc("CONGRATULATIONS! YOU WON! :-)", "Do you want to play again?");
                }
            }
        }
    }]);

    return Player;
}(GameObject);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});