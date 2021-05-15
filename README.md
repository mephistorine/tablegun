# tablegun

[![Latest release version](https://img.shields.io/npm/v/tablegun.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen)](https://www.npmjs.com/package/tablegun)
![NPM downloads](https://img.shields.io/npm/dw/tablegun.svg?logo=npm)
<!-- ![GitHub Release Date](https://img.shields.io/github/release-date/mephistorine/tablegun) -->
![GitHub (Pre-)Release Date](https://img.shields.io/github/release-date-pre/mephistorine/tablegun?label=pre-release%20date)
![Coverage](https://img.shields.io/codecov/c/github/mephistorine/tablegun/stable.svg?logo=jest)

Fast and simple table-like data procession like sorting, filtering, transforming and count total value.

> ⛔️ NOTE: Production not ready!

## Install

```bash
npm install tablegun
```

## Usage

```typescript
const columns: Column[] = [
  Column.build('stargazers_count', [
    { filter: (stars: number) => stars > 50_000 }
  ])
]

const table: Table<any> = new Table(columns)
expect(table.calculate(data).map((repo: any) => repo.name)).toEqual([
  'angular',
  'vue',
  'react',
  'hugo'
])
```

## Contributing

Check the [CONTRIBUTING](CONTRIBUTING.md) file

## Roadmap

- Transforms
- Total count

## Credits

- Icons made by [Freepik](https://www.freepik.com) from [flaticon.com](https://www.flaticon.com/)
