const file = Bun.file("./input/day7.txt");
const input = await file.text();

// Part 1
// Create a list of all directories and their sizes

const lines = input
  .split("\n")
  .slice(0, -1)
  .filter((line) => !line.includes("$ ls"))
  .filter((line) => !line.includes("dir "));

const root: any = {};
let cwd = root;
const path: any[] = [];

lines.forEach((line) => {
  if (line[0] === "$") {
    const dir = line.slice(5);
    if (dir === "..") {
      path.pop();
      cwd = path.at(-1);
    } else {
      if (!Object.keys(cwd).includes(dir)) {
        cwd[dir] = {};
      }
      cwd = cwd[dir];
      path.push(cwd);
    }
  } else {
    const [size, name] = line.split(" ");
    cwd[name] = Number(size);
  }
});

// console.log(Bun.inspect(root));
// console.log(root["/"]);

// Get sizes of directories
// function getSize(currentDir: any) {
//
// }

// function populateTree(parent_id) {
//   const users = p.filter(({ parent }) => parent == parent_id);
//
//   return users.map((user) => {
//     const children = p.filter((child) => child.parent === user.position);
//     return {
//       label: user.position,
//       innerHtml: "",
//       children: children.map((child) => {
//         if (user.position !== child.parent) return;
//         return {
//           label: child.position,
//           innerHtml: "",
//           children: populateTree(child.position),
//         };
//       }),
//     };
//   });
// }
//
// const result = populateTree("");
