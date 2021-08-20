let board = document.getElementById("container");
const button = document.getElementById("button");
let playerFlag;
let player_flag = playerFlag;
let arr = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
let round = 0;
const content = document.getElementById("content");

let Player1 = document.getElementById("countWinL");
let Player2 = document.getElementById("countWinR");

//Table with winning moves from dataset x and y
const winsArr = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ],
  [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 1 },
    { x: 2, y: 0 },
  ],
];

let winPlayer1 = 0;
let winPlayer2 = 0;

//check who wont in game
const check = () => {
  winsArr.forEach((win) => {
    let winMoves = 0;
    win.forEach((cor) => {
      const x = cor["x"];
      const y = cor["y"];
      if (arr[y][x] === player_flag) {
        winMoves++;
      }
      if (winMoves === 3) {
        content.textContent = `Win ${player_flag.toUpperCase()}`;
        board.removeEventListener("click", boardEventListener);
        round = round + 1;
        board.classList.add("boardExtraClass");
      }
      if (player_flag === "o" && winMoves === 3) {
        winPlayer1++;
        Player1.innerHTML = winPlayer1;
        setTimeout(function () {
          confirm(`Win O`);
        }, 100);
      } else if (player_flag === "x" && winMoves === 3) {
        winPlayer2++;
        Player2.innerHTML = winPlayer2;
        setTimeout(function () {
          confirm(`Win X`);
        }, 100);
      }
    });
  });
};

const createSquareToPlay = () => {
  arr.forEach((tab, y) => {
    tab.forEach((el, x) => {
      let squareToPlay = document.createElement("div");
      const div = document.querySelector("div");
      squareToPlay.classList.add("box");
      squareToPlay.dataset.x = x;
      squareToPlay.dataset.y = y;
      div.appendChild(squareToPlay);
      arr.push(squareToPlay);
    });
  });
};

const borderAdd = (e) => {
  board.addEventListener("mouseover", (e) => {
    e.target.classList.add("classExtra");
  });
  board.addEventListener("mouseout", (e) => {
    e.target.classList.remove("classExtra");
  });
};

const boardEventListener = (e) => {
  if (e.target.dataset.ifClicked) return;

  const x = e.target.dataset["x"];
  const y = e.target.dataset["y"];
  arr[y][x] = player_flag;
  e.target.classList.add("ifClicked");
  e.target.classList.add(player_flag);
  e.target.dataset.ifClicked = "ifClicked";
  check();
  player_flag = player_flag === "o" ? "x" : "o";
};

const nextRound = () => {
  button.addEventListener("click", () => {
    if (player_flag) {
      content.textContent = `Next round is ${round + 1}`;
    }
    board.textContent = " ";
    board.classList.replace("boardExtraClass", "box");
    arr = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    createSquareToPlay();
    board.addEventListener("click", boardEventListener);
  });
};

const loadAllFunctions = (function () {
  createSquareToPlay();
  borderAdd();
  nextRound();
  board.addEventListener("click", boardEventListener);
  //createForm();
})();
////////////////////////////////////////////////////////////
//Create Form

const formId = document.getElementById("formId");

let form = document.createElement("form");
form.classList.add("form");
form.innerHTML = `
<h1>Player2</h1>
<form>
<input type="text" placeholder="Player name" name="playerName"></input>
<label for="x">X</label>
<input type="radio" name="Player" id="x" value="x">
<label for="o">O</label>
<input type="radio" name="Player" id="o" value="o">
<input type="submit" class="submit">
</form>`;
formId.appendChild(form);

let createFormToPlay = document.querySelector("form");
createFormToPlay.onsubmit = function (e) {
  e.preventDefault();
  createFormToPlay.classList.add("hidden");

  let player1 = (document.getElementById("namePlayer2").innerHTML =
    this.playerName.value);
  playerFlag = this.Player.value;
  player_flag = playerFlag;
};
