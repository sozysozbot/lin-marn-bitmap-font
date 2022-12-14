import * as fs from 'fs';
import * as pngjs from 'pngjs';
(async function () {
	const in_path = process.argv[3] ?? "pngs"
	const out_path = process.argv[4] ?? "svgs"
	const files = fs.readdirSync(`${in_path}/`);
	files.forEach((file, index) => {
		fs.createReadStream(`${in_path}/${file}`)
			.pipe(new pngjs.PNG())
			.on("parsed", function () {
				let svg = `<svg viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg">`;
				let txt = "";
				for (var y = 0; y < this.height; y++) {
					for (var x = 0; x < this.width; x++) {
						var idx = (this.width * y + x) << 2;
						if (this.data[idx] === 0
							&& this.data[idx + 1] === 0
							&& this.data[idx + 2] === 0
							&& this.data[idx + 3] === 255
						) {
							svg += `  <rect width="1" height="1" x="${x}" y="${y}" />\n`;
							txt += "@";
						} else if (this.data[idx] === 255
							&& this.data[idx + 1] === 255
							&& this.data[idx + 2] === 255
							&& this.data[idx + 3] === 255
						) {
							txt += "-";
						} else {
							throw new Error(`Invalid color rgba(${this.data[idx]},${this.data[idx + 1]},${this.data[idx + 2]},${this.data[idx + 3]}) found in ${file}`);
						}
					}
					txt += "\n"
				}
				svg += "</svg>";
				console.log(`${file}:\n${txt}`);
				fs.writeFileSync(`${out_path}/${file.slice(0, -4)}.svg`, svg);
			});
	})
})();