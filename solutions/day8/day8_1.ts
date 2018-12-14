import fs from "fs";

const fileText = fs.readFileSync("day8_input.txt").toString();
const numbers = fileText.split(" ").map((x) => parseInt(x, 0));

console.log(numbers);

interface INode {
  children: INode[];
  metaData: number[];
}

let pointer = 0;

function parseChild(): INode {
  const numberOfChildren = numbers[pointer++];
  const numberOfMetadata = numbers[pointer++];

  const children = new Array(numberOfChildren).fill(0).map((x) => parseChild());
  const metaData = new Array(numberOfMetadata).fill(0).map((x) => numbers[pointer++]);

  return {
    children,
    metaData,
  };
}

const tree = parseChild();

function sumMetadata(node: INode) {
  const all: number[] = [ ...node.metaData, ...node.children.map(sumMetadata)];
  return all.reduce((x, y) => x + y);
}

console.log(sumMetadata(tree));

function calculateValue(node: INode) {
  let result = 0;

  const numberOfChildren = node.children.length;

  if (numberOfChildren === 0) {
    result = node.metaData.reduce((x, y) => x + y);
  } else {
    const values = node.metaData.map((metaDataValue) => {
      if (metaDataValue > 0 && metaDataValue <= node.children.length) {
        return calculateValue(node.children[metaDataValue - 1]);
      } else {
        return 0;
      }
    });

    result = values.reduce((x, y) => x + y);
  }

  return result;
}

console.log(calculateValue(tree));
