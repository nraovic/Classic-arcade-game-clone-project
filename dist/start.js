'use strict';

/* This file adds functionalities to the index.html page
 * It provides a list of character to choose from, 
 * a form to insert a player's name and 
 * the start button that runs the game by redirecting to game.html
*/

//create a button for each character 
var buttons = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png'];
var displayBtn = function displayBtn() {
    buttons.forEach(function (choice) {
        var buttonList = document.createElement("LI");
        var btn = document.createElement("BUTTON");
        btn.className += "char-button";
        btn.style.cssText = 'background-image: url(' + choice + ');';
        buttonList.appendChild(btn);
        document.getElementById("player").appendChild(buttonList);
    });
};
displayBtn();

//store Player's choice of character in session Storage
var ul = document.getElementById('player');
var charList = ul.childNodes;

ul.addEventListener("click", function (e) {
    var button = e.target;
    if (button.tagName === 'BUTTON') {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = charList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var char = _step.value;

                if (char === button.parentNode) {
                    char.className = 'checked';
                } else {
                    char.className = '';
                }
            }
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

        var buttonClicked = button.style.backgroundImage.match(/"(.*?)"/)[1]; //parse the url to get only the image name 
        sessionStorage.setItem('sprite', buttonClicked);
    }
});

//store Player's name in session storage
var form = document.querySelector('.name-form');
var input = form.querySelector('input');
form.addEventListener('change', function (e) {
    e.preventDefault();
    var value = input.value;
    sessionStorage.setItem('charName', value);
});

//create Start Game button that runs the game and rediractes to game.html 
//check if the character and name are inserted before redirecting
var button = document.querySelector('.start-button');
button.addEventListener('click', function (e) {

    if (sessionStorage.getItem('sprite') === null) {
        alert('Please Choose a Character');
        return;
    }

    if (sessionStorage.getItem('charName') === null) {
        alert('Please Enter Your Name');
        return;
    }

    window.open("game.html", "_self");
});