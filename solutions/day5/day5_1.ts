import fs from "fs";

const fileText = fs.readFileSync("day5_input.txt").toString();

const s = Array.from(fileText);

function sameCharacterDifferentCase(a: string, b: string): boolean {
  return a !== b && (a.toLowerCase() === b || a.toUpperCase() === b);
}

let changes = 1;
while (changes !== 0) {
  changes = 0;
  let counter = 0;
  while (counter < s.length) {
    if (sameCharacterDifferentCase(s[counter], s[counter + 1])) {
      console.log(s[counter] + s[counter + 1]);
      s.splice(counter, 2);
      changes++;
    } else {
      counter++;
    }
  }
}

console.log("Result = " + s.length);
