import * as fs from 'fs';
const str = fs.readFileSync("linglyph.txt", "utf-8");
const arr = str.split("\r\n\r\n");
arr.sort();
console.log(arr.map(a => a.slice(0, 6)).join(" "));
fs.writeFileSync("lin_sort.txt", arr.join("\n\n"));