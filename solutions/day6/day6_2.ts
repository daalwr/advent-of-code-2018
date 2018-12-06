import fs from "fs";

const fileText = fs.readFileSync("day6_input.txt").toString();
const lines = fileText.split("\n");

interface ICoordinatePair {
  x: number;
  y: number;
}

const stringCoords = lines.map((s) => s.split(", "));
const coords: ICoordinatePair[] = stringCoords.map((pair) => ({y: parseInt(pair[0], 0), x: parseInt(pair[1], 0)}));

const xCoords = coords.map((pair) => pair.x);
const yCoords = coords.map((pair) => pair.y);

const maxX = Math.max(...xCoords) + 1;
const maxY = Math.max(...yCoords) + 1;

const grid: string[][] = [...Array(maxX)].map((row) => Array(maxY).fill(""));

let count = 0;

for (let x = 0; x < maxX; x++) {
  for (let y = 0; y < maxY; y++) {
    let totalDistance = 0;
    coords.forEach((pair) => totalDistance += (Math.abs(pair.x - x) + Math.abs(pair.y - y)));
    if (totalDistance < 10000) {
      count++;
    }
  }
}

console.log(count);
