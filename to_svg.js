"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const pngjs = __importStar(require("pngjs"));
(async function () {
    const in_path = process.argv[3] ?? "pngs";
    const out_path = process.argv[4] ?? "svgs";
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
                        && this.data[idx + 3] === 255) {
                        svg += `  <rect width="1" height="1" x="${x}" y="${y}" />\n`;
                        txt += "@";
                    }
                    else if (this.data[idx] === 255
                        && this.data[idx + 1] === 255
                        && this.data[idx + 2] === 255
                        && this.data[idx + 3] === 255) {
                        txt += "-";
                    }
                    else {
                        throw new Error(`Invalid color rgba(${this.data[idx]},${this.data[idx + 1]},${this.data[idx + 2]},${this.data[idx + 3]}) found in ${file}`);
                    }
                }
                txt += "\n";
            }
            svg += "</svg>";
            console.log(`${file}:\n${txt}`);
            fs.writeFileSync(`${out_path}/${file.slice(0, -4)}.svg`, svg);
        });
    });
})();
