const numberOfPlayers2 = 419;
const lastMarble2 = 7105200;

class Marble {
  public value: number;
  public previous: Marble | null;
  public next: Marble | null;

  constructor(value: number, previous: Marble | null, next: Marble | null ) {
    this.value = value;
    this.previous = previous;
    this.next = next;
  }
}

let circlePointer: Marble;

circlePointer = new Marble(0, null, null);
circlePointer.next = circlePointer;
circlePointer.previous = circlePointer;

let marble = 1;

const scores2 = new Array(numberOfPlayers2).fill(0);

while (marble <= lastMarble2) {
  if (marble % 23 === 0) {
    // console.log("Score " + marble);
    circlePointer = (circlePointer.previous) as Marble;
    circlePointer = (circlePointer.previous) as Marble;
    circlePointer = (circlePointer.previous) as Marble;
    circlePointer = (circlePointer.previous) as Marble;
    circlePointer = (circlePointer.previous) as Marble;
    circlePointer = (circlePointer.previous) as Marble;
    circlePointer = (circlePointer.previous) as Marble;
    // console.log("Let's remove " + circlePointer.value);

    scores2[marble % numberOfPlayers2] += (marble + circlePointer.value);

    const removeMe = circlePointer;
    (removeMe.previous as Marble).next = removeMe.next;
    (removeMe.next as Marble).previous = removeMe.previous;
    circlePointer = removeMe.next as Marble;
    marble++;
  } else {
    circlePointer = circlePointer.next as Marble;
    const newMarble = new Marble(marble++, circlePointer, circlePointer.next);
    ((circlePointer.next) as Marble).previous = newMarble;
    circlePointer.next = newMarble;
    circlePointer = newMarble;
  }
  const previous = circlePointer.previous as Marble;
  const next = circlePointer.next as Marble;
  // console.log("At marble " + circlePointer.value + " previous is " + previous.value + " next is " + next.value);
}

console.log(Math.max(...scores2));
