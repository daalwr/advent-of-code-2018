import fs from "fs";
import { parse } from "url";

const fileText = fs.readFileSync("day4_input.txt").toString();
const claims = fileText.split("\n");

interface IEntry {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  message: string;
}

function toComparable(entry: IEntry): number {
  return entry.minute +
  entry.hour * 100 +
  entry.day * 10000 +
  entry.month * 1000000 +
  entry.year * 100000000;
}

function parseClaim(input: string): IEntry {
  const entryParser = /\[(\d\d\d\d)-(\d\d)-(\d\d)\s(\d\d):(\d\d)\]\s(.+)/g;
  const match = entryParser.exec(input);
  if (match !== null) {
    return {
      year: parseInt(match[1], 0),
      month: parseInt(match[2], 0),
      day: parseInt(match[3], 0),
      hour: parseInt(match[4], 0),
      minute: parseInt(match[5], 0),
      message: match[6],
    };
  } else {
    throw Error("Unable to parse: " + input);
  }
}

const parsedClaims = claims.map(parseClaim).sort((a, b) => toComparable(a) - toComparable(b));

function addGuardData(id: string, asleep: number, wokeUp: number) {
  let previousGuardData: number[];

  const dataInMap = guardData.get(id);
  if (dataInMap !== undefined) {
    previousGuardData = dataInMap;
  } else {
    previousGuardData = new Array(60).fill(0);
  }

  for (let i = asleep; i < wokeUp; i++) {
    previousGuardData[i]++;
  }

  guardData.set(id, previousGuardData);
}

let claimPointer = 0;
const guardData: Map<string, number[]> = new Map();

while (claimPointer < parsedClaims.length) {
  const guardIdExtractor = /#(\d+)/g;
  const guardIdLine = parsedClaims[claimPointer];
  const match = guardIdExtractor.exec(guardIdLine.message);
  claimPointer++;

  if (match !== null) {
    while (claimPointer < parsedClaims.length && parsedClaims[claimPointer].message === "falls asleep") {
      addGuardData(match[1], parsedClaims[claimPointer].minute, parsedClaims[claimPointer + 1].minute);
      claimPointer += 2;
    }
  }
}

let answerGuardId = "";
let longestAsleepMinute = 0;
let numberOfTimesAsleep = 0;

Array.from(guardData.entries()).forEach((guardMinutesPair) => guardMinutesPair[1].forEach((num, index) => {
  if (numberOfTimesAsleep < num) {
    longestAsleepMinute = index;
    numberOfTimesAsleep = num;
    answerGuardId = guardMinutesPair[0];
  }
}));

console.log(`ID of guard who spent most time asleep: ${answerGuardId}`);
console.log(`Minute he was asleep: ${longestAsleepMinute}`);
console.log(`Answer: ${parseInt(answerGuardId, 0) * longestAsleepMinute}`);
