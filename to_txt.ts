import * as pack_unpack from 'pack_and_unpack_png_bitmap_glyphs';
pack_unpack.to_txts({ in_path: "pngs", out_path: "txts", start: 0x3400, end: 0x10000, filepath_to_codepoint: (filepath: string) => filepath.codePointAt(0)! });
