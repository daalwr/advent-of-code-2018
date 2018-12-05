import fs from "fs";

function getLength(character: string): [string, number] {
  const fileText = fs.readFileSync("day5_input.txt").toString();
  let s = Array.from(fileText);

  s = s.filter((x) => x !== character && x !== character.toUpperCase());

  function sameCharacterDifferentCase(a: string, b: string): boolean {
    return a !== b && (a.toLowerCase() === b || a.toUpperCase() === b);
  }

  let changes = 1;
  while (changes !== 0) {
    changes = 0;
    let counter = 0;
    while (counter < s.length) {
      if (sameCharacterDifferentCase(s[counter], s[counter + 1])) {
        s.splice(counter, 2);
        changes++;
      } else {
        counter++;
      }
    }
  }

  return [character, s.length];
}
console.log(Array.from("abcdefghijklmnopqrstuvwxyz").map((x) => getLength(x)).sort((a, b) => a[1] - b[1]));
