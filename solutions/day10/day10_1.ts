import fs from "fs";

const fileText = fs.readFileSync("day10_input.txt").toString();
const stars = fileText.split("\n").map(parseRow);

function parseRow(input: string) {
  const entryParser = /position=<\s*(\-?\d+),\s*(\-?\d+)> velocity=<\s*(\-?\d+),\s+(\-?\d+)>/g;
  const match = entryParser.exec(input);
  if (match !== null) {
    return {
      xP: parseInt(match[1], 0),
      yP: parseInt(match[2], 0),
      xV: parseInt(match[3], 0),
      yV: parseInt(match[4], 0),
    };
  } else {
    throw Error("Unable to parse: " + input);
  }
}

for (let secs = 0; secs < 10124; secs++) {
  stars.forEach((star) => {
    star.xP = star.xP + star.xV;
    star.yP = star.yP + star.yV;
  });
}

console.log(stars);

const sky: string[][] = new Array(150).fill(" ").map(() => new Array(150).fill(" "));

stars.forEach((star) => {
  const y = star.yP - 100;
  const x = star.xP - 100;
  if (x < 150 && x >= 0 && y < 150 && y >= 0) {
    sky[y][x] = "*";
  }
});

console.log(sky.map((row) => row.join("")));

console.log(stars);

const xDiff = Math.max(...stars.map((star) => star.xP)) - Math.min(...stars.map((star) => star.xP));
const yDiff = Math.max(...stars.map((star) => star.yP)) - Math.min(...stars.map((star) => star.yP));

console.log("Xdiff = " + xDiff);
console.log("Ydiff = " + yDiff);
