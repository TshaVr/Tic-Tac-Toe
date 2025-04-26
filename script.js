// giving variable for selectors
const Allbox = document.querySelectorAll(".box");
const stts = document.querySelector(".status");
const btnrestart = document.querySelector(".restart");
const sttsbox = document.querySelector(".grid .boxes");
const scoreX = document.getElementById("p1");
const scoreO = document.getElementById("p2");
const scoreboard_O = document.getElementById("userO");
const scoreboard_X = document.getElementById("userX");

// X and O

const x = "X";
const o = "O";

const winningalgorithm = [  //winning possibalities algorithms
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Data
let option = ["","","","","","","","",""];
let currentplayer = o;
let player = "O";
let running = false;
start();

function start(){ // game initiater function
    Allbox.forEach(box=>box.addEventListener("click", boxclick));
    stts.textContent=`PLAYER ${player} TURN `;
    btnrestart.addEventListener("click", restartGame); 
    running = true;
}

function boxclick(){ // clicking box function
    const info = this.dataset.info;
    if(option[info]!="" || !running ){
        return;
    }
    boxupdate(this,info);
    checkwinner();
}

function boxupdate(box,info){ //fill up box function
    option[info]=player;
    box.innerHTML=currentplayer;
}

function changeplayer(){ // players playing turn by turn function
    player = (player=="X") ? "O" :"X"; 
    currentplayer = (currentplayer==x)  ?o :x; 
    stts.textContent=`PLAYER ${player} TURN `;
}

function checkwinner(){  // winner checking function
    let iswon=false;
    for(let i=0; i<winningalgorithm.length; i++){
        const algorithm=winningalgorithm[i];
        const bx1 = option[algorithm[0]];
        const bx2 = option[algorithm[1]];
        const bx3 = option[algorithm[2]];

        if (bx1=="" || bx2=="" || bx3==""){
            continue;
        }else if (bx1==bx2 && bx2==bx3){
            iswon=true;
            Allbox[algorithm[0]].classList.add("win");
            Allbox[algorithm[1]].classList.add("win");
            Allbox[algorithm[2]].classList.add("win");
            stts.classList.add("textanime");
            sttsbox.classList.add("boxanime");
            pointincrement();
        }
    }
    if(iswon==true){
        stts.textContent=`PLAYER ${player} WON!!`; 
        win_music();
        running=false;
    }else if(!option.includes("")){
        stts.textContent="MATCH DRAW...";
        draw_music();
        running=false;
    }else{
        changeplayer();
    }
}

function restartGame(){  // restart the game function
    option = ["","","","","","","","",""];
    currentplayer = (currentplayer==x) ?o: x;
    player = (player=="X") ? "O" :"X"; 
    running = true;
    stts.textContent=`PLAYER ${player} TURN`;
    stts.classList.remove("textanime");
    sttsbox.classList.remove("boxanime");
    scoreboard_X.classList.remove("point_X");
    scoreboard_O.classList.remove("point_O");

    Allbox.forEach(box=>{
        box.innerHTML="";
        box.classList.remove("win");
    });
}

function soundreset(){
    const sd = new Audio('Restart_sound.mp3') 
    sd.play() 
}

function soundbox(){
    const sd = new Audio('box_sound.mp3') 
    sd.play() 
}

function win_music(){
    const sd = new Audio('win_music.mp3') 
    sd.play()
}

function draw_music(){
    const sd = new Audio('draw2_music.mp3') 
    sd.play()
}

function button(){
    const sd = new Audio('box_sound.mp3') 
    sd.play()
}

function gamesound(){
    const sd = new Audio('newgame_sound.mp3') 
    sd.play()
}   

function okay_sound(){
    const sd = new Audio('okay.mp3') 
    sd.play()
}   

var song = document.getElementById("song");
var button_song = document.getElementById("button_song"); 
song.volume = 0.4;  

button_song.onclick = function(){
    if(song.paused){
        song.play();
        button_song.src = "pause_button.png";
    }else{
        song.pause();
        button_song.src = "play_button.png";    
    }
}

let scorepoint_O = 0;
let scorepoint_X = 0;

function pointincrement(){
    if (currentplayer == x){
        scorepoint_X = scorepoint_X + 1;
        scoreX.innerHTML = scorepoint_X;
        scoreboard_X.classList.add("point_X")
    }else{
        scorepoint_O = scorepoint_O + 1;
        scoreO.innerHTML = scorepoint_O;
        scoreboard_O.classList.add("point_O")
    }
}

function resetgame(){
    option = ["","","","","","","","",""];
    currentplayer = (currentplayer==x) ?o: x;
    player = (player=="X") ? "O" :"X"; 
    running = true;
    stts.textContent=`PLAYER ${player} TURN`;
    stts.classList.remove("textanime");
    sttsbox.classList.remove("boxanime");
    scoreboard_X.classList.remove("point_X");
    scoreboard_O.classList.remove("point_O");
    Allbox.forEach(box=>{
        box.innerHTML="";
        box.classList.remove("win");
    });
    pointreset();
    show();
    gamesound();
}

function pointreset(){
    scorepoint_O = 0;
    scoreO.innerHTML = scorepoint_O;
    scorepoint_X = 0;  
    scoreX.innerHTML = scorepoint_X;
}

const notification = document.getElementById("alert");

function show(){
    notification.classList.add("alerting");
    running = false;
}

function hide(){
    notification.classList.remove("alerting");
    running = true;
    okay_sound();
}
