const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const typingDiv = document.getElementById("typing");
const startBtn = document.getElementById("startGame");
const tryAgainBtn = document.getElementById("tryAgain");
const bombImage = document.getElementById("bomb");
const containerDiv = document.getElementById("main-container");
const backgroundDiv = document.getElementById("selectBagroundDiv");
const apocaliptyImg = document.getElementById("apocaliptyImg");

const pharagraphs = [
    'Just weeks before the US dropped the most' , 
    'powerful weapon mankind has ever known',
    'Nagasaki was not even on a list of target',
    'for the atomic bomb. In its place',
    'was Japans ancient capital, Kyoto.',
    'The list was created by a committee',
    'of American military generals, army officers',
    'and scientists. Kyoto, which is home',
    'to more than 2,000 Buddhist temples',
    'and Shinto shrines, including 17 World',
    'Heritage Sites, was at the top of it.'

];

// const text = '"This target is an urban industrial area with a population of 1,000,000," the minutes from the meeting note. They also described the people of Kyoto as "more apt to appreciate the significance of such a weapon as the gadget". "Kyoto was seen as an ideal target by the military because it had not been bombed at all, so many of the industries were relocated and some major factories were there," says Alex Wellerstein, who is a historian of science at the Stevens Institute of Technology.';

let bombXposition = 220;
let bombYposition = -100;
let bombDroppingFrecuency = 700;
let bombRadio = 10;

function theBomb(){
    ctx.drawImage(bomb, bombXposition, bombYposition);
}
ctx.save();
function bombDroppingMovement() {
    let bombTime = setInterval(frame, bombDroppingFrecuency);
    function frame() {
        theBomb();
        if (bombYposition >= 100) {
            clearInterval(bombTime);
            // alert("Game Over");
            tryAgainBtn.style.display = "block";
        } 
        else {
            bombYposition = bombYposition+ 10;
        }
    }
}

function Explotion() {
    let bombExplotion = setInterval(frame, -100);
    function frame() {
        if (bombYposition >= 100 && bombRadio <=250){
            ctx.beginPath();
            ctx.arc(290, 300, bombRadio++, 0, 1*Math.PI,1.8*Math.PI);
            ctx.fillStyle = "#db7103";
            ctx.fill();
        }
        else if(bombRadio >= 250){
            clearInterval(bombExplotion);
            typingDiv.style.display = "none";
            bombImage.style.display  = "none";
            setInterval(function () {ctx.drawImage(apocaliptyImg, 0,0, 588, 354);}, 1000);
        }
    }
}

// Background Selection
const selectBackground = document.getElementById("selectBackgrounds");
const bgSelection = () =>{
    const optionSelected = selectBackground.options[selectBackground.selectedIndex].value;
    if(optionSelected == "roof"){
        containerDiv.style.backgroundImage = "url(img/rooftopViewCity.jpg)";
    }
    if(optionSelected == "city"){
        containerDiv.style.backgroundImage = "url(img/city-background.jpg)";
    }
    if(optionSelected == "nomada"){
        containerDiv.style.backgroundImage = "url(img/nomada-town.jpg)";
    }
    if(optionSelected == "pixel"){
        containerDiv.style.backgroundImage = "url(img/pixel-art-city.png)";
    }
    if(optionSelected == "myangone"){
        containerDiv.style.backgroundImage = "url(img/Myangone-town.jpg)";
    }
    
}
selectBackground.onchange = bgSelection;
bgSelection();

//Game process
const startGame = () =>{

    bombDroppingMovement(); 
    typingProcess();
    Explotion();
    function typingProcess (){
        typingDiv.innerText = "";
        startBtn.classList.add("hidden");
        backgroundDiv.classList.add("hidden");

    const text = pharagraphs[parseInt(Math.random() * pharagraphs.length)];

    const characters = text.split('').map(char =>{
        const span = document.createElement('span');
        span.innerText =char;
        typingDiv.appendChild(span);
        return span;
    })

    let cursorIndex = 0;
    let currentLetter = characters[cursorIndex];
    currentLetter.classList.add("current-letter");

    const keydown = ({ key })=>{
        if (key === currentLetter.innerText){
            currentLetter.classList.remove("current-letter");
            currentLetter.classList.add("done");
            currentLetter = characters[++cursorIndex];
            bombYposition = bombYposition -2;
        }

        if(cursorIndex >= characters.length){
            document.removeEventListener("keydown", keydown);
        return typingProcess();
        }
        currentLetter.classList.add("current-letter");
    }
    document.addEventListener("keydown", keydown);
    };
};

const tryAgain = () =>{
    location.reload();
}