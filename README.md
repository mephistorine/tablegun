<p align="center"><img src="tablegun.svg" alt="Tablegun logo" width="200"></p>

> ⛔️ NOTE: NOT READY FOR PRODUCTION!

# tablegun

[![Latest release version](https://img.shields.io/npm/v/tablegun.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen)](https://www.npmjs.com/package/tablegun)
![NPM downloads](https://img.shields.io/npm/dw/tablegun.svg?logo=npm)
![GitHub (Pre-)Release Date](https://img.shields.io/github/release-date-pre/mephistorine/tablegun?label=Pre%20release)
![Coverage](https://img.shields.io/codecov/c/github/mephistorine/tablegun/stable.svg?logo=jest)

<!-- ![GitHub Release Date](https://img.shields.io/github/release-date/mephistorine/tablegun) -->

**Fast** and **zero dependencies** table-like data procession like sorting, filtering, transforming and count total value.

## Install

```bash
npm install tablegun
```

## Usage

### Basic

Should filter users over 19 years old

```typescript
// Create some data
const data: User[] = [
  { name: 'John', age: 14 },
  { name: 'Jane', age: 17 },
  { name: 'Bob', age: 19 },
  { name: 'Paul', age: 20 },
  { name: 'Kate', age: 30 },
]

// Define columns
const columns: Column[] = [
  // Define column for 'age'
  Column.build('age', [ { filter: (age: number) => age > 19 } ])
]

// Create table with defined columns
const table: Table<any> = new Table(columns)

// Calculate result
console.log(table.calculate(data).map((repo: any) => repo.name))
// > [
//   'Paul',
//   'Kate',
// ]
```

## Contributing

Check the [CONTRIBUTING](CONTRIBUTING.md) file

## Roadmap

- Transforms
- Total count
- Columns preset for primitives
