import fs from "fs";

const input = fs.readFileSync("day2_input.txt").toString();

const words = input.split("\n");

const letterCount = (s: string) => {
  const answers = new Map<string, number>();

  s.split("").map((c) => {
    if (answers.has(c)) {
      const currentValue = answers.get(c);
      if (currentValue !== undefined) {
        answers.set(c, currentValue + 1);
      }
    } else {
      answers.set(c, 1);
    }
  });
  return answers;
};

const hasAThreeLetter = (letterMap: Map<string, number>) => {
  const entries = Array.from(letterMap.entries());
  return entries.filter((pair) => pair[1] === 3).length > 0;
};

const hasATwoLetter = (letterMap: Map<string, number>) => {
  const entries = Array.from(letterMap.entries());
  return entries.filter((pair) => pair[1] === 2).length > 0;
};

let twoCount = 0;
let threeCount = 0;

words.map((word) => {
  const lc = letterCount(word);

  if (hasATwoLetter(lc)) {
      twoCount += 1;
  }

  if (hasAThreeLetter(lc)) {
    threeCount += 1;
  }
});

console.log("Result: " + (twoCount * threeCount));
