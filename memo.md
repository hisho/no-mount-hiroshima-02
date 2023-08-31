何を話すか迷った
候補は3つあって
- 三種の神器
- slidevのReact版を開発している話
- 技術記事書くことはいいぞ〜〜！
でもやめて三種の神器にした

- 型で困った経験はありませんか？
- 本日はそんな
  - 型がanyで困った経験を持つ方
  - 途中で型が消失して正しく推論されない経験を持つ方
- のお悩みを解決する

- 三種の神器
  - (typesafe-utils)
  - (ts-pattern)
  - (zod)

を紹介します

まずは1つ目   
(typesafe-utils)[https://github.com/ivanhofer/typesafe-utils]   
- filterの型のはなしをする
- filter以外での条件分岐の話をする

## filterの型の話

例えば下記の配列からundefinedを取り除く場合
```ts
const hoge = ['hoge', 'huga', undefined] // ^? (string | undefined)[]
```

一般的な方法は
```ts
const filterdHoge1 = hoge.filter(Boolean) // ^? (string | undefined)[]
const filterdHoge2 = hoge.filter((n) => typeof n !== 'undefined') // ^? (string | undefined)[]
const filterdHoge3 = hoge.filter((n) => typeof n === 'string') // ^? (string | undefined)[]
```

しかし正しく処理しているのにも関わらず`(string | undefined)[]`と推論されます
そこで正しく推論させるのには下記の方法がとられると思います。

```ts
const filterdHoge1 = hoge.filter((n): n is string => Boolean(n)) // ^? string[]
const filterdHoge2 = hoge.filter((n): n is string => typeof n !== 'undefined') // ^? string[]
const filterdHoge3 = hoge.filter((n): n is string => typeof n === 'string') // ^? string[]
```

下記のように書くことができます
```ts
import { isNotUndefined, isString } from 'typesafe-utils'
const filterdHoge1 = hoge.filter(isString) // ^? string[]
const filterdHoge2 = hoge.filter(isNotUndefined) // ^? string[]
```

ちょっとうれしいですよね


- filter以外での条件分岐の話

`"noUncheckedIndexedAccess": true`の場合下記の`hoge`は`string | undefined`になるが`isArrayNotEmpty`を使うと`string`に推論される
```ts
const nonEmptyArray = ['hi']

if (!!nonEmptyArray.length) {
  const hoge = nonEmptyArray[0]?.toUpperCase() // ^? string | undefined
}

if (isArrayNotEmpty(nonEmptyArray)) {
  const huga = nonEmptyArray[0].toUpperCase() // ^? string
}
```

その他にもTSを使う上で便利な関数が揃っているのでぜひ触ってみてください

そして1つ目   
(ts-pattern)[https://github.com/gvergnaud/ts-pattern]
- パターンマッチを持ち込む

![image](https://user-images.githubusercontent.com/9265418/231688650-7cd957a9-8edc-4db8-a5fe-61e1c2179d91.gif)

```ts
switch (type) {
  case 'text':
  case 'span':
  case 'p':
    return 'text';

  case 'btn':
  case 'button':
    return 'button';
}
```

```ts
const sanitize = (name: string) =>
  match(name)
    .with('text', 'span', 'p', () => 'text')
    .with('btn', 'button', () => 'button')
    .otherwise(() => name);

sanitize('span'); // 'text'
sanitize('p'); // 'text'
sanitize('button'); // 'button'
```

さいごに3つ目   
(zod)[https://github.com/colinhacks/zod]
- すべてにおいて最強(like a satoru)
- TS使う場合においてすべてに利用可能
- エコシステムが最強


## coerceで事前処理挟んだり
```ts
const paramsSchema = z.object({
  slug: z.coerce.number(),
})
```

`''`空文字の場合はnullを返したり可能

```ts
const paramsSchema = z.object({
  slug: z.preprocess((v) => (isEmpty(v) ? null : v), z.string().nullable()),
})
```

transformを用いて値を加工することも可能
```ts
const schema = z
        .object({
          list: z.string().array(),
        })
        .transform((v) => {
          return {
            ...v,
            list: v.list.map((n) => ({ id: n })),
          }
        })

type Type1 = z.infer<typeof schema> // ^? {list: {id: string}[]}
type Type2 = z.output<typeof schema> // ^? {list: {id: string}[]}
type Type3 = z.input<typeof schema> // ^? {list: ZodArray<ZodString>["_input"]}
```

おまけ(4種目)
zodのエコシステムのtRPCのenvバリデーションのスタンドアロン版
https://github.com/t3-oss/t3-env

https://github.com/t3-oss/t3-env
Next.js版があるのでぜひ使おう！！
公式ではmjsだが拡張子はtsでも使用可能