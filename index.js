let boardTiles = document.getElementsByClassName("board-tile");
let tileText = document.querySelectorAll(".tile-text");
let topLine = document.querySelector(".top-line");
let bottomLine = document.querySelector(".bottom-line");
let playerX = document.querySelector(".player-x");
let playerO = document.querySelector(".player-o");
let restart = document.querySelector(".restart");

let player = 'X';
let gameOver = false;
let count = 0;
let patternMatch;

let txtStyle = "rgb(14, 240, 70)";
let shadowStyle = "1px 2px 5px rgb(73, 242, 115)";

let audio = new Audio('winner.mp3');
let lostAudio = new Audio('down.mp3');
let validClick = new Audio('valid-click.wav');
let invalidClick = new Audio('wrong-click.wav');

if(player === 'X'){
    playerX.classList.add("script-style-x");
    playerO.classList.remove("script-style-o");
}


let styleWinner = (pattern, clrTxt, shadowTxt) => {
    tileText[pattern[0]].style.color= clrTxt;
    tileText[pattern[0]].style.textShadow= shadowTxt;
    tileText[pattern[1]].style.color= clrTxt;
    tileText[pattern[1]].style.textShadow= shadowTxt;
    tileText[pattern[2]].style.color= clrTxt;
    tileText[pattern[2]].style.textShadow= shadowTxt;
}

let checkWon = () => {
    const winPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    winPattern.forEach((pattern) => {
        if(
            tileText[pattern[0]].innerText === tileText[pattern[1]].innerText &&
            tileText[pattern[1]].innerText === tileText[pattern[2]].innerText &&
            tileText[pattern[0]].innerText != ""
        ){
            gameOver = true;
            patternMatch = pattern;
            styleWinner(patternMatch, txtStyle, shadowStyle);
            
            topLine.innerText = `Player ${player}`;
            bottomLine.innerText = `Wins The Game`;
            audio.play();
        }else if(count == 9 && !gameOver){
            topLine.innerText = `No One Wins`;
            bottomLine.innerText = `It's a Tie!!`;
            lostAudio.play();
        }
    });
}

let changePlayer = () => {
    // if(player === 'X') player = 'O';
    // else player = 'X';

    player = player === 'X' ? 'O' : 'X';

    if(player === 'O'){
        playerO.classList.add("script-style-o");
        playerX.classList.remove("script-style-x");      
    }else{
        playerX.classList.add("script-style-x");
        playerO.classList.remove("script-style-o");
    }
}

for(let i=0; i<boardTiles.length; i++){

    boardTiles[i].addEventListener("click", () => {
        let cellValue = boardTiles[i].querySelector(".tile-text");
        if(cellValue.innerText === '' && !gameOver){
            validClick.play();
            cellValue.innerText = player;
            count++;
            checkWon();
            changePlayer();
        }else{
            invalidClick.play();
        }
    })
}


restart.addEventListener("click", () => {
    tileText.forEach((cell) => {
        cell.innerText = "";
    })
    topLine.innerText = `Let's Play`;
    bottomLine.innerText = `The Zero-Kata Game!`;
    if(player == 'O') changePlayer();
    gameOver = false;
    count = 0;
    styleWinner(patternMatch, "#4c6986", "none");
});
