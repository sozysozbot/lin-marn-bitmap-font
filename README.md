# lin-marn-bitmap-font【網墨倉字】

![](logo.svg)

[燐字リポジトリ](https://github.com/jurliyuuri/lin-marn)にあるビットマップフォントをコンパイルするための仕組み。**`pngs` にビットマップを手動で入れる**。

## ttf / woff の出力
WOFF にはビットマップフォントを扱う仕組みがないので、それぞれのドットを SVG の正方形へと変換する必要がある。ということで

```
node to_svg.js
```

で `svgs/` に SVG が吐かれる。それを

```
node to_font.js
```

で変換してやることによって、 `fonts` フォルダに `ttf` と `woff` が出力される。

## txt の出力

```
node to_txt.js
```

をすることで、`txts` フォルダに

```
0x9ed2
................
................
.........@......
..@......@......
..@@@@..@.@.....
.@...@..@.@.....
....@..@...@....
..@.@.@..@..@...
...@.....@...@..
...@@..@.@.@....
...@.@.@.@.@....
.@@......@......
........@@......
.........@......
................
................
```

みたいなのが吐かれる。ただし、現状では対応するコードポイントを U+3400～U+FFFF の範囲に絞っている。

これらを生成した後で、`node merge_txts.js` を走らせると、これらが文字コード順にソートされて一つの `linglyph.txt` に収まる。こいつは [改造 MikanOS](https://github.com/sozysozbot/mikanos/tree/hsjoihs/kernel) への入力として使う。

## 開発者のための注意

package.json にある

```json
  "overrides": {
    "fantasticon": {
      "glob": "7.2.0"
    }
  }
```

は https://github.com/tancredi/fantasticon/issues/470 を避けるためのもの。

以下のコマンドを実行していて No SVGs found というエラーに直面したら、


```bash
npm uninstall fantasticon && npm install fantasticon
```

で直ります。(cf. https://github.com/npm/cli/issues/4232 )
