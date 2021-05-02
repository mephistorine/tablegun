import { Column } from './column/column'
import { ColumnSortDirection } from './column/column-sort-direction'
import { Table } from './table'

const data: any[] = [
  {
    name: 'Sam',
    age: 20,
    jobPosition: 'Frontend developer',
    rank: 'Middle'
  },
  {
    name: 'Ivan',
    age: 29,
    jobPosition: 'Chief Technical Officer',
    rank: null
  },
  {
    name: 'Sergey',
    age: 20,
    jobPosition: 'Frontend developer',
    rank: 'Junior'
  },
  {
    name: 'Ilya',
    age: 22,
    jobPosition: 'Backend developer',
    rank: 'Middle'
  },
  {
    name: 'Alexandr',
    age: 35,
    jobPosition: 'Frontend developer',
    rank: 'Junior'
  },
  {
    name: 'Suren',
    age: 26,
    jobPosition: 'Backend developer',
    rank: 'Junior'
  }
]

describe(`buildDataset`, () => {

  test(`test`, () => {
    const columns: Column<unknown>[] = [
      Column.build('name', ColumnSortDirection.ascending, [
        { filter: (item: unknown) => item === 'Sam' || item === 'Alexandr' }
      ]),
      Column.build('age', ColumnSortDirection.descending, [], {
        compare: (a: number, b: number) => a - b
      })
    ]

    const table: Table<unknown> = new Table(columns)
    const expected = table.calculate(data)
    expect(expected.map((item: any) => item.name)).toEqual([ 'Sam', 'Alexandr' ])
  })
})
