import fs from "fs";

const fileText = fs.readFileSync("day3_input.txt").toString();
const claims = fileText.split("\n");

interface IClaim {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

function parseClaim(input: string): IClaim {
  const squareParser = /(#\d+)\s\@\s(\d+),(\d+)\:\s(\d+)x(\d+)/g;
  const match = squareParser.exec(input);
  if (match !== null) {
    return {
      id: match[1],
      x: parseInt(match[2], 0),
      y: parseInt(match[3], 0),
      width: parseInt(match[4], 0),
      height: parseInt(match[5], 0),
    };
  } else {
    throw Error("Unable to parse: " + input);
  }
}

const parsedClaims = claims.map(parseClaim);

const fabric = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

parsedClaims.forEach((claim) => {
  for (let x = claim.x; x < claim.x + claim.width; x++) {
    for (let y = claim.y; y < claim.y + claim.height; y++) {
      fabric[x][y]++;
    }
  }
});

let count = 0;

fabric.forEach((row) => row.forEach((cell) => {
  if (cell > 1) {
    count++;
  }
}));

console.log(count);
