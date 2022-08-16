import * as fs from 'fs';
(async function () {
	const in_path = process.argv[3] ?? "txts"
	const out_path = process.argv[3] ?? "linglyph.txt"
	const files = fs.readdirSync(`${in_path}/`);
	let strs: string[] = [];
	files.forEach((file, index) => {
		let str = fs.readFileSync(`${in_path}/${file}`, "utf-8");
		strs.push(str);
	});
	strs.sort();
	fs.writeFileSync("linglyph.txt", strs.join(""));
})();