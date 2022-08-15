import * as fs from 'fs';
import * as pngjs from 'pngjs';
(async function () {
	const in_path = process.argv[3] ?? "pngs"
	const files = fs.readdirSync(`${in_path}/`);

	let ans = "";
	files.forEach((file, index) => {
		fs.createReadStream(`${in_path}/${file}`)
			.pipe(new pngjs.PNG())
			.on("parsed", function () {
				const codepoint = file.codePointAt(0)!;
				if (codepoint <= 0x7f) return;
				let info = `0x${codepoint.toString(16)}`;
				console.log(info);
				ans += info + "\n";
				let txt = "";
				for (var y = 0; y < this.height; y++) {
					for (var x = 0; x < this.width; x++) {
						var idx = (this.width * y + x) << 2;
						if (this.data[idx] === 0
							&& this.data[idx + 1] === 0
							&& this.data[idx + 2] === 0
							&& this.data[idx + 3] === 255
						) {
							txt += "@";
						} else if (this.data[idx] === 255
							&& this.data[idx + 1] === 255
							&& this.data[idx + 2] === 255
							&& this.data[idx + 3] === 255
						) {
							txt += ".";
						} else {
							throw new Error(`Invalid color rgba(${this.data[idx]},${this.data[idx + 1]},${this.data[idx + 2]},${this.data[idx + 3]}) found in ${file}`);
						}
					}
					txt += "\n"
				}
				console.log(`${txt}`);
				ans += txt + "\n";
			});
	})
})();