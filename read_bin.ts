/*
Reads a flat binary of the form

struct LinMarnGlyph {
	uint32_t code_point;
	uint16_t glyph[16];
};
*/
import * as fs from 'fs';
import * as pngjs from 'pngjs';
(async function () {
	const in_path = process.argv[3] ?? "lin_marn.bin"
	const out_path = process.argv[3] ?? "lin_marn_glyphs.txt"
	const buffer = fs.readFileSync(`${in_path}`);
	let ans = "";
	for (let p = 0; p < buffer.length; p += 36) {
		let codepoint = (buffer[p + 1] << 8) + buffer[p];
		let info = `0x${codepoint.toString(16)} '${String.fromCodePoint(codepoint)}'`;
		console.log(info);
		ans += info + "\n";
		for (let y = 0; y < 16; y++) {
			let row = (buffer[p + 2 * y + 5] << 8) + buffer[p + 2 * y + 4];
			let txt = "";
			for (let x = 0; x < 16; x++) {
				txt += (row << x) & 0x8000 ? '@' : '.';
			}
			console.log(txt);
			ans += txt + "\n";
		}
		console.log("");
		ans += "\n";
	}
	fs.writeFileSync(`${out_path}`, ans);
})();