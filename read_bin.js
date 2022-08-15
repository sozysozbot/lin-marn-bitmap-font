"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
/*
Reads a flat binary of the form

struct LinMarnGlyph {
    uint32_t code_point;
    uint16_t glyph[16];
};
*/
const fs = __importStar(require("fs"));
(async function () {
    const in_path = process.argv[3] ?? "lin_marn.bin";
    const out_path = process.argv[3] ?? "lin_marn_glyphs.txt";
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
