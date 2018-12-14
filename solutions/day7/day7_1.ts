import fs from "fs";

const fileText = fs.readFileSync("day7_input.txt").toString();
const lines = fileText.split("\n");

interface IRule {
  step: string;
  dependsOn: string;
}

const parseLine = (input: string) => {
  return {
    step: input.charAt(5),
    dependsOn: input.charAt(36),
  };
};

const rules = lines.map(parseLine);

const graph = new Map<string, string[]>();

function addToGraph(rule: IRule) {
  const existingValue = graph.get(rule.dependsOn);
  if (existingValue !== undefined) {
    existingValue.push(rule.step);
  } else {
    graph.set(rule.dependsOn, [rule.step]);
  }

  const otherStep = graph.get(rule.step);
  if (otherStep === undefined) {
    graph.set(rule.step, []);
  }
}

rules.forEach((rule) => addToGraph(rule));

console.log(graph);

let result = "";

while (graph.size > 0) {

  // Find all which have no dependencies.
  const entries = Array.from(graph.entries());
  const candidates = entries.filter((x) => x[1].length < 1).map((x) => x[0]);
  candidates.sort();

  const chosenOne = candidates[0];
  result += chosenOne;

  graph.delete(chosenOne);

  graph.forEach((value, key) => {
    const values = graph.get(key);
    if (values !== undefined) {
      graph.set(key, values.filter((x) => x !== chosenOne));
    }
  });

}

console.log(result);
