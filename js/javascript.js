const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const typingDiv = document.getElementById("typing");
const startBtn = document.getElementById("startGame");
const tryAgainBtn = document.getElementById("tryAgain");
const containerDiv = document.getElementById("main-container");
const backgroundDiv = document.getElementById("selectBagroundDiv");
const dificultyDiv = document.getElementById("dificultyDiv");

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

var bombXposition = 230;
var bombYposition = -20;
var bombDroppingFrecuency = 700;
let bombRadio = 10;

bomb1 = new Image();
bomb1.src = 'img/bomb1.png';

destroyedCity = new Image();
destroyedCity.src = 'img/1.webp';

function bombDroppingMovement() {
    let bombTime = setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        theBomb();
        if (bombYposition >= 220) {
            clearInterval(bombTime);
            // alert("Game Over");
            ctx.font = "30px Arial";
        }
        else {
            bombYposition += 8
        }
    }, bombDroppingFrecuency);
}

// Draw of the BOMB
function theBomb(){
    ctx.drawImage(bomb1, bombXposition, bombYposition, 130, 80);

    ///Sound of the bomb explotion.
    if (bombYposition >= 220 && bombYposition <=228){
            const explotionSound = new Audio('sounds/bomb-exploding.wav');
            explotionSound.play();
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
    if(optionSelected == "cartoon"){
        containerDiv.style.backgroundImage = "url(img/cartoon-city.jpg)";
    }
}
selectBackground.onchange = bgSelection;
bgSelection();


// Dificulty Selection
const dificulty = document.getElementById("dificulty");
const dificultySelection = () =>{
    const dificultySelected = dificulty.options[dificulty.selectedIndex].value;
    if(dificultySelected == "easy"){
        bombDroppingFrecuency = 600;
    }
    if(dificultySelected == "medium"){
        bombDroppingFrecuency = 400;
    }
    if(dificultySelected == "hard"){
        bombDroppingFrecuency = 200;
    }
}
dificulty.onchange = dificultySelection;
dificultySelection();

/// This event created the Impact Point light where the bomb is going to explode.
startBtn.addEventListener("click", function(){
    let impactPoint = setInterval(frame, 200);
    let lightRadio = 0;
    function frame() {
            if (bombYposition >= 220){
                clearInterval(impactPoint);
            }
            else if (lightRadio <=5){
                ctx.beginPath();
            ctx.arc(294, 292, lightRadio++, 0, 2*Math.PI);
            var grd = ctx.createRadialGradient(75, 250, 5, 360, 60, 500);
            grd.addColorStop(0, "yellow");
            grd.addColorStop(1, "orange");
            ctx.fillStyle = grd;
            ctx.fill();
            }
            else if(lightRadio >=5){
                lightRadio = 0;
            }           
        }
});

//Game process
const startGame = () =>{

    bombDroppingMovement();
    typingProcess();
    explotion();

    let numberOfLivesSave = 0;

    function explotion() {

    let bombExplotion = setInterval(frame, -100);
    function frame() {

        if (bombYposition >= 220 && bombRadio <=250 && bombYposition <=260 ){
            ctx.beginPath();
            ctx.arc(290, 300, bombRadio++, 0, 1*Math.PI,1.8*Math.PI);
            var grd = ctx.createRadialGradient(75, 250, 5, 360, 60, 500);
            grd.addColorStop(0, "yellow");
            grd.addColorStop(1, "orange");
            ctx.fillStyle = grd;
            ctx.fill();
        }
        else if(bombRadio >= 250){
            clearInterval(bombExplotion);
            typingDiv.style.display = "none";
            setInterval(function () {ctx.drawImage(destroyedCity, 0,0, 588, 354);
            ctx.font = "30px Georgia";
            ctx.fillStyle = "white";
            ctx.fillText("The city has been destroyed but", 90, 100);
            ctx.fillText(" you saved: " + numberOfLivesSave + " people", 140, 140);
            tryAgainBtn.style.display = "block";
            }, 2000);
        }
    }
}

    function typingProcess (){
        typingDiv.innerText = "";
        startBtn.classList.add("hidden");
        backgroundDiv.classList.add("hidden");
        dificultyDiv.classList.add("hidden");
    
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
            bombYposition = bombYposition -4;
            numberOfLivesSave = numberOfLivesSave +1;
            const music = new Audio('sounds/keys.mp3');
            music.play();
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