const numberOfPlayers = 419;
const lastMarble =  71052;

const circle = [0];

let marbleCount = 1;
let pointer = 0;

const scores = new Array(numberOfPlayers).fill(0);

let currentPlayer = 0;

function addNextMarble() {
  if (marbleCount % 1000 === 0) {
    // console.log(marbleCount);
  }
  if (marbleCount % 23 === 0) {
    pointer = (pointer + circle.length - 7) % circle.length;
    const score = marbleCount + circle[pointer];
    console.log("Player " + currentPlayer + " scores: " + marbleCount + " + " + circle[pointer]);
    scores[currentPlayer] += score;
    circle.splice(pointer, 1);
    marbleCount++;
  } else {
    const whereToInsertMarble = (pointer + 2) % circle.length;
    pointer = whereToInsertMarble;
    circle.splice(whereToInsertMarble, 0, marbleCount++);
  }
  // console.log("Now pointing to " + circle[pointer]);
  currentPlayer = (currentPlayer + 1) % numberOfPlayers;
}

// console.log(circle);
while (marbleCount <= lastMarble) {
  addNextMarble();
  // console.log(circle);
}

// console.log(scores);
