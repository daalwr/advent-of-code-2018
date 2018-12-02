import fs from "fs";

const input = fs.readFileSync("day1_input.txt").toString();

const numbers = input.split("\n");

const positive = (s: string) => s.charAt(0) === "+";
const value = (s: string) => s.substr(1);
const parse = (s: string) => positive(s) ? parseInt(value(s), 0) : -parseInt(value(s), 0);

const result = numbers.map(parse).reduce((a, b) => a + b);

console.log(result);
