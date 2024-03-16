// styling
let win = "";
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let turn = "X";
let mybt = document.querySelectorAll(".bt");

let start = document.querySelector(".start");
let end_btn = document.querySelector(".end_class");
let reset = document.querySelector(".reset");
let div_game = document.querySelector(".game");

div_game.style.visibility = "hidden";
document.querySelector(".winclass").style.visibility = "hidden";

start.addEventListener("click", my_start);
reset.addEventListener("click", my_reset);
end_btn.addEventListener("click",my_end);

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// game logic

mybt.forEach(btn => {
    btn.addEventListener("click", () => {
        if (turn == "X") {
            btn.innerText = "X";
            turn = "0";
        }
        else {
            btn.innerText = "0";
            turn = "X";
        }
        btn.disabled = true;
        check_winner();
        if(win==="")
        {
            check_draw();
        }    
        show_winner();
    })
});


const check_winner = () => {
    for (let ptrn of winPattern) {
        let firbt = (mybt[ptrn[0]]).innerText;
        let secbt = (mybt[ptrn[1]]).innerText;
        let thirbt = (mybt[ptrn[2]]).innerText;

        if (firbt != "" && secbt != "" && thirbt != "") {
            if (firbt == secbt && firbt == thirbt) {
                (mybt[ptrn[0]]).style.backgroundColor="darkred";
                (mybt[ptrn[1]]).style.backgroundColor="darkred";
                (mybt[ptrn[2]]).style.backgroundColor="darkred";
                
                win = firbt;
                show_winner();
            }
        }
    }
}

function check_draw()
{   
    let empty_btn=true;
    mybt.forEach(btn=>{
        if(btn.innerText==="" || !btn.disabled)
        {
            empty_btn=false;
        }
    });
    if(empty_btn)
    {
        win="Game Ended!\nIt's a Draw!";
    }
}


function show_winner() {
    if (win != "") {
        if (win == "X") {
            win = "Congratulations!\nWinner is Player 1";
        }
        else if (win == "0") {
            win = "Congratulations!\nWinner is Player 2";
        }
        mybt.forEach(btn => {
            btn.disabled = true;
            document.querySelector(".winclass").innerText = win;
            end_btn.before(document.querySelector(".winclass"));
            document.querySelector(".winclass").style.visibility = "visible";
            end_btn.style.visibility = "hidden";
            reset.style.visibility = "hidden";
        });
    }
}

// ----------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// start button

function my_start()
{
    start.style.visibility = "hidden";
    div_game.style.visibility = "visible";
    document.querySelector(".start").before(div_game);
}

// ===============================================================================

// Reset button

function my_reset() {
    console.log("reset");
    win = "";
    mybt.forEach(btn => {
        btn.disabled = false;   
        btn.innerText="";
    });
    
}

// ===============================================================================

// End button

function my_end()
{
    console.log("End");
    my_reset();
    div_game.before(start);
    start.style.visibility="visible";
    div_game.style.visibility = "hidden";
    document.querySelector(".winclass").style.visibility = "hidden";
}


// 