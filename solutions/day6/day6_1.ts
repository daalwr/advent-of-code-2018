import fs from "fs";

const fileText = fs.readFileSync("day6_input.txt").toString();
const lines = fileText.split("\n");

interface ICoordinatePair {
  x: number;
  y: number;
}

const stringCoords = lines.map((s) => s.split(", "));
const coords: ICoordinatePair[] = stringCoords.map((pair) => ({y: parseInt(pair[0], 0), x: parseInt(pair[1], 0)}));
console.log(coords);

const xCoords = coords.map((pair) => pair.x);
const yCoords = coords.map((pair) => pair.y);

const maxX = Math.max(...xCoords) + 1;
const maxY = Math.max(...yCoords) + 1;

const grid: string[][] = [...Array(maxX)].map((row) => Array(maxY).fill(""));

function getClosestPoint(x: number, y: number): string {
  const array = coords.map((pair, index) => {
    const distance = Math.abs(pair.x - x) + Math.abs(pair.y - y);
    return { distance , id: index};
  });

  array.sort((a, b) => a.distance - b.distance);

  if (array[0].distance === array[1].distance) {
    console.log(`x: ${x}, y: ${y}, ${JSON.stringify(array)}`);
    return ".";
  } else {
    return "" + array[0].id;
  }
}

for (let x = 0; x < maxX; x++) {
  for (let y = 0; y < maxY; y++) {
    const result = getClosestPoint(x, y);
    grid[x][y] = result;
  }
}

const positionCounts = new Map<string, number>();

function increment(position: string) {
  const currentCount = positionCounts.get(position);
  if (currentCount !== undefined) {
    positionCounts.set(position, currentCount + 1);
  } else {
    positionCounts.set(position, 1);
  }
}

grid.forEach((row, x) => row.forEach((cell, y) => increment(cell)));

const bannedPositions: string[] = new Array();
grid.forEach((row, x) => row.forEach((cell, y) => {
  if (x === 0 || x === maxX - 1 || y === 0 || y === maxY - 1) {
    bannedPositions.push(cell);
  }
}));

console.log(grid);

const allowedPairs =
Array.from(positionCounts.entries()).filter((idAndCount) => bannedPositions.indexOf(idAndCount[0]) === -1);

console.log(allowedPairs);

const winner = allowedPairs.sort((x, y) => y[1] - x[1])[0];

console.log(`id: ${winner[0]}, area: ${winner[1]}`);
