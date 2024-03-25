const file = Bun.file("./input/day7.txt");
const input = await file.text();

// Part 1
// Create a list of all directories and their sizes

const lines = input
  .split("\n")
  .slice(0, -1)
  .filter((line) => !line.includes("$ ls"));

let paths = ["/"];

lines
  .filter((line) => line.includes("$ cd"))
  .slice(1)
  .forEach((line) => {
    const folder = line.split(" ").at(-1);
    if (folder === "..") {
      const prevPath = paths.at(-1)!.split("/").slice(0, -2).join("/");
      paths.push(`${prevPath}/`);
    } else {
      paths.push(`${paths.at(-1)}${folder}/`);
    }
  });

const uniquPaths = Object.fromEntries(paths.map((path) => [path, 0]));
console.log(uniquPaths);

const currentPath: string[] = [];
lines
  .filter((line) => !line.includes("dir "))
  .forEach((line) => {
    if (line.includes("$ cd")) {
      const folder = line.split(" ").at(-1);
      if (folder === "..") {
        currentPath.pop();
      } else {
        currentPath.push(folder!);
      }
    } else {
      if (currentPath.length === 1) {
        uniquPaths["/"] = uniquPaths["/"]! + Number(line.split(" ")[0]);
      } else {
        const path = `/${currentPath.slice(1).join("/")}/`;
        console.log(path);
        uniquPaths[path] = uniquPaths[path]! + Number(line.split(" ")[0]);
      }
    }
  });

console.log(uniquPaths);
// const paths: string[] = [];

// const res = [...folders.entries()].filter(([_, value]) => {
//   return value <= 100000;
// });
//
// console.log("folders", lines.length);
// console.log(
//   "Part 1:",
//   res.reduce((a, b) => a + b[1], 0),
// );
