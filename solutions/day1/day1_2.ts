import fs, { symlinkSync } from "fs";

const input = fs.readFileSync("day1_input.txt").toString();

const numbers = input.split("\n");

const positive = (s: string) => s.charAt(0) === "+";
const value = (s: string) => s.substr(1);
const parse = (s: string) => positive(s) ? parseInt(value(s), 0) : -parseInt(value(s), 0);

const visitedLocations: number[] = [];
let currentPosition = 0;

const step = (i: number) => {
  currentPosition = currentPosition + i;
  if (visitedLocations.indexOf(currentPosition) >= 0) {
    console.log("Result:" + currentPosition);
    process.exit();
  }
  visitedLocations.push(currentPosition);
};

const parsedNumbers = numbers.map(parse);

while (true) {
  parsedNumbers.map(step);
}
