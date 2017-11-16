//all player's choices
let buttons = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png'];
buttons.display = function () {
    buttons.forEach(function (choice) {
        let buttonList = document.createElement("LI");
        let btn = document.createElement("BUTTON");
        btn.className += "char-button";
        btn.style.cssText = `background-image: url(${choice});`;
        buttonList.appendChild(btn);
        document.getElementById("player").appendChild(buttonList);
    })
}
buttons.display();


//store Player's choice of character in session Storage
const ul = document.getElementById('player');
const lists = ul.childNodes;

ul.addEventListener("click", (e) => {
    const button = e.target;
    if(button.tagName === 'BUTTON') {
        for (let list of lists) {
            if (list === button.parentNode) {
                list.className = 'checked';
            }
            else {
                list.className = '';
            }
        }
        const buttonClicked = button.style.backgroundImage.match(/"(.*?)"/)[1]; //parse the url to get only the image name 
        sessionStorage.setItem('sprite', buttonClicked);
    }
})

//store Player's name in session storage
const form = document.querySelector('.name-form');
const input = form.querySelector('input');
form.addEventListener('change', (e) => {
    e.preventDefault();
    const value = input.value;
    sessionStorage.setItem('charName', value);

})

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
    
    window.open("game.html", "_self");
})

//create Start Game button

//redirect page to the game when the Start Game button is clicked
