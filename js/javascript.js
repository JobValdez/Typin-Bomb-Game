const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const typingDiv = document.getElementById("typing");
const startBtn = document.getElementById("startGame");
const tryAgainBtn = document.getElementById("tryAgain");

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

console.log(ctx);

let bombXposition = 260;
let bombYposition = 0;

const startGame = () =>{

    typingDiv.innerText = "";

    startBtn.classList.add("hidden");

    const text = pharagraphs[parseInt(Math.random() * pharagraphs.length)];

    const characters = text.split('').map(char =>{
        const span = document.createElement('span');
        span.innerText =char;
        typingDiv.appendChild(span);
        console.log(char);
        return span;
    })

    let cursorIndex = 0;
    let currentLetter = characters[cursorIndex];
    currentLetter.classList.add("current-letter");

    document.addEventListener("keydown", ({ key })=>{
        if (key === currentLetter.innerText){
            currentLetter.classList.remove("current-letter");
            currentLetter.classList.add("done");
            currentLetter = characters[++cursorIndex];
            console.log(bombXposition);

            let bomb = new Image();
            bomb.src = "img/missile-.png";

            bomb.onload = function () {
            ctx.drawImage(bomb, bombXposition, bombYposition = bombYposition -5, bomb.width/2, bomb.height/2);
            bomb.src = "#";        
            }
        }

        if(cursorIndex >= characters.length){
            console.log("se acabo el parrafo");
            return startGame();
        }

        currentLetter.classList.add("current-letter");

    });

    tryAgainBtn.classList.add("displayBlock");
};

const tryAgain = () =>{
    location.reload();
}