import { generateFonts, FontAssetType, OtherAssetType } from 'fantasticon';
import * as fs from 'fs';
import * as fs_extra from 'fs-extra'
(async function () {
  const in_path = process.argv[3] ?? "imgs"
  const out_path = process.argv[4] ?? "fonts"
  const glyph_map: { [key: string]: number } = {};
  const files = fs.readdirSync(`${in_path}/`);
  files.forEach((file, index) => {
    if (file.slice(-4) !== ".svg") return;
    if (file === "_colon.svg") {
      glyph_map[":"] = ":".charCodeAt(0);
    } else {
      glyph_map[file[0]] = file.charCodeAt(0);
    }
  });
  generateFonts({
    inputDir: `./${in_path}`,
    outputDir: `./${out_path}`,
    name: "lin-marn-bitmap-font",
    fontTypes: [FontAssetType.TTF, FontAssetType.WOFF],
    assetTypes: [
      OtherAssetType.CSS,
      OtherAssetType.HTML,
      OtherAssetType.JSON,
      /* OtherAssetType.TS */ // The TS asset is buggy; remove
    ],
    fontHeight: 480,
    codepoints: glyph_map
  }).then(results => {
    console.log(results);
    // copy the resulting fonts into docs/
    fs_extra.copy("fonts", "docs/fonts");
  });
})();
