/* This file adds functionalities to the index.html page
 * It provides a list of character to choose from, 
 * a form to insert a player's name and 
 * the start button that runs the game by redirecting to game.html
*/

//create a button for each character 
const buttons = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png'];
const displayBtn = () => {
    buttons.forEach((choice) => {
        let buttonList = document.createElement('LI');
        let btn = document.createElement('BUTTON');
        btn.className += 'char-button';
        btn.style.cssText = `background-image: url(${choice});`;
        buttonList.appendChild(btn);
        document.getElementById('player').appendChild(buttonList);
    });
};
displayBtn();


//store Player's choice of character in session Storage
const ul = document.getElementById('player');
const charList = ul.childNodes;

ul.addEventListener('click', (e) => {
    const button = e.target;
    if(button.tagName === 'BUTTON') {
        for (let char of charList) {
            if (char === button.parentNode) {
                char.className = 'checked';
            }
            else {
                char.className = '';
            }
        }
        //Get the url of the button's background image
        const buttonBackgroundUrl = button.style.backgroundImage;
        //Parse the url to get only the image name
        const buttonBackgroundUrlParts = buttonBackgroundUrl.split("\"");
        spritePath = buttonBackgroundUrlParts[1];
        console.log(spritePath);
        sessionStorage.setItem('sprite', spritePath);
    }
});

//store Player's name in session storage
const form = document.querySelector('.name-form');
const input = form.querySelector('input');
form.addEventListener('change', (e) => {
    e.preventDefault();
    const value = input.value;
    sessionStorage.setItem('charName', value);

});

//create Start Game button that runs the game and rediractes to game.html 
//check if the character and name are inserted before redirecting
const button = document.querySelector('.start-button');
button.addEventListener('click', (e) => {

    if (sessionStorage.getItem('sprite') === null) {
        alert('Please Choose a Character');
        return;
    } 

    if (sessionStorage.getItem('charName') === null) {
        alert('Please Enter Your Name');
        return;
    } 
    
    window.open('game.html', '_self');
});
