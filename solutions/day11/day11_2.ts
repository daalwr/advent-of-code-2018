import fs from "fs";

function calculatePowerLevel(x: number, y: number, serialNumber: number) {
  const rackId = x + 10;
  let powerLevel = rackId * y;
  powerLevel += serialNumber;
  powerLevel *= rackId;
  const hundredsDigit = Math.floor(powerLevel / 100) % 10;
  return hundredsDigit - 5;
}

const fuelCells: number[][] = new Array(300).fill(0).map(() => new Array(300).fill(0));

fuelCells.forEach((row, x) =>
  row.forEach((cell, y) => {
    fuelCells[x][y] = calculatePowerLevel(x, y, 9221);
}));

let max = 0;
let recordHolder = "";

for (let gridSize = 1; gridSize <= 300; gridSize++) {

  console.log(gridSize);

  for (let x = 0; x < 300 - gridSize - 1; x++) {
    for (let y = 0; y < 300 - gridSize - 1; y++) {
      let candidateScore = 0;

      for (let x2 = 0; x2 < gridSize; x2++) {
        for (let y2 = 0; y2 < gridSize; y2++) {
          candidateScore += fuelCells[x + x2][y + y2];
        }
      }

      if (candidateScore > max) {
        max = candidateScore;
        recordHolder = `x:${x}, y:${y}, size: ${gridSize}`;
      }
    }
  }
}

console.log(recordHolder);
