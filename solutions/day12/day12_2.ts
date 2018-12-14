import fs from "fs";

// tslint:disable-next-line:max-line-length
const initialState = "##..#.#.#..##..#..##..##..#.#....#.....##.#########...#.#..#..#....#.###.###....#..........###.#.#..";
const fileText = fs.readFileSync("day12_input.txt").toString();
const rules = fileText.split("\n").map((row) => {
  const pair = row.split(" => ");
  return {
    pattern: pair[0],
    result: pair[1],
  };
});

console.log(rules);

const padding = 10000;

const paddedInitialState = ".".repeat(padding) + initialState + ".".repeat(padding);
console.log(paddedInitialState);

function calculateNextGeneration(input: string) {
  let res = "";
  for (let i = 0; i < input.length; i++) {
    const ll = getValue(input, i - 2);
    const l = getValue(input, i - 1);
    const c = getValue(input, i);
    const r = getValue(input, i + 1);
    const rr = getValue(input, i + 2);

    const previousPattern = ll + l + c + r + rr;

    res += calculateResult(previousPattern);
  }
  return res;
}

function getValue(input: string, index: number) {
  if (index < 0 || index >= input.length) {
    return ".";
  } else {
    return input.slice(index, index + 1);
  }
}

function calculateResult(pattern: string): string {
  const rule = rules.find((x) => x.pattern === pattern);
  if (rule !== undefined) {
    return rule.result;
  } else {
    return ".";
  }
}

let currentGeneration = paddedInitialState;
for (let g = 1; g <= 1000; g++) {
  currentGeneration = calculateNextGeneration(currentGeneration);
  console.log(`${g}: ${calculateScore()}`);
}

function calculateScore() {
  let score = 0;
  for (let i = 0; i < currentGeneration.length; i++) {
    const potScore = i - padding;
    if (currentGeneration.charAt(i) === "#") {
      score += potScore;
    }
  }
  return score;
}

// Noticed by inspection that once it stabilises the nth term is 23n + 358.
