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

const sleepMinuteList: Array<[string, number]> =
Array.from(guardData.entries()).map((pair) => {
  const result: [string, number] = [pair[0], pair[1].reduce((a, b) => a + b)];
  return result;
});

const sortedList = sleepMinuteList.sort((a, b) => b[1] - a[1]);

const biggestSleeper = sortedList[0];

const biggestSleeperId = sortedList[0][0];
const amountOfTimeAsleep = sortedList[0][1];

const biggestSleeperPattern = guardData.get(biggestSleeperId);

if (biggestSleeperPattern !== undefined) {
  const sleepsFor = biggestSleeperPattern.reduce((a, b) => a > b ? a : b);
  const minute = biggestSleeperPattern.indexOf(sleepsFor);

  console.log(`Guard ${biggestSleeperId} sleeps for ${sleepsFor} minutes in minute ${minute}`);
  console.log(`Answer: ${parseInt(biggestSleeperId, 0) * minute}`);
}
