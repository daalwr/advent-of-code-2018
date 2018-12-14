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

for (let x = 0; x < 300 - 2; x++) {
  for (let y = 0; y < 300 - 2; y++) {
    const candidateScore =
    fuelCells[x][y] + fuelCells[x + 1][y] + fuelCells[x + 2][y] +
    fuelCells[x][y + 1] + fuelCells[x + 1][y + 1] + fuelCells[x + 2][y + 1] +
    fuelCells[x][y + 2] + fuelCells[x + 1][y + 2] + fuelCells[x + 2][y + 2];

    if (candidateScore > max) {
      max = candidateScore;
      recordHolder = `x:${x}, y:${y}`;
    }
  }
}

console.log(recordHolder);
