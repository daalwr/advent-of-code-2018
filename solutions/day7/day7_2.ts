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

const workTimer = new Map<string, number>();

function decreaseCount(job: string) {
  const currentCount = workTimer.get(job);
  if (currentCount !== undefined) {
    workTimer.set(job, currentCount - 1);
  }
}

graph.forEach((value, key) => workTimer.set(key, key.charCodeAt(0) - 4));

console.log(workTimer);

function getAvailableJobs(): string[] {
  // Find all which have no dependencies.
  const entries = Array.from(graph.entries());
  const candidates = entries.filter((x) => x[1].length < 1).map((x) => x[0]);
  candidates.sort();
  return candidates;
}

function markJobComplete(job: string) {
  graph.delete(job);
  graph.forEach((value, key) => {
    const values = graph.get(key);
    if (values !== undefined) {
      graph.set(key, values.filter((x) => x !== job));
    }
  });
}

let inProgressJobs: string[] = [];
let secondCount = 0;
while (graph.size > 0) {
  const otherAvailableJobs = getAvailableJobs().filter((x) => inProgressJobs.indexOf(x) < 0);
  inProgressJobs = [ ...inProgressJobs, ...otherAvailableJobs.slice(0, Math.max(0, 5 - inProgressJobs.length))];
  console.log(`Second ${secondCount} working on ${inProgressJobs}`);
  inProgressJobs.forEach((job) => decreaseCount(job));
  inProgressJobs.forEach((job) => {
    const currentCount = workTimer.get(job);
    if (currentCount !== undefined && currentCount === 0) {
      markJobComplete(job);
      inProgressJobs = inProgressJobs.filter((x) => x !== job);
    }
  });
  secondCount++;
}

console.log(secondCount);
