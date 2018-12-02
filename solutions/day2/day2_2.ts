import fs from "fs";

const input = fs.readFileSync("day2_input.txt").toString();

const words = input.split("\n");

function compareWords(word1: string, word2: string) {
  const word1chars = word1.split("");
  const word2chars = word2.split("");

  let differences = 0;
  word1chars.forEach((item, index) => {
    if (item !== word2chars[index]) {
      differences += 1;
    }
  });
  return differences;
}

function removeDifferences(word1: string, word2: string) {
  const word1chars = word1.split("");
  const word2chars = word2.split("");

  const result = [];

  for (let i = 0; i < word1.length; i++) {
    if (word1chars[i] === word2chars[i]) {
      result.push(word1chars[i]);
    }
  }

  return result.join("");
}

words.map((aWord) => {
  words.map((bWord) => {
    if (compareWords(aWord, bWord) === 1) {
      console.log(removeDifferences(aWord, bWord));
      process.exit();
    }
  });
});
