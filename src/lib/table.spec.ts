import { Column, noopSort, tableProcess } from './table'

const data: any[] = [
  {
    name: 'Sam',
    age: 20,
    jobPosition: 'Frontend developer',
    rank: 'Middle'
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
  },
  {
    name: 'Ivan',
    age: 29,
    jobPosition: 'Chief Technical Officer',
    rank: null
  }
]

describe(`buildDataset`, () => {

  test(`test`, () => {
    const columns: Map<string, Column> = new Map<string, Column>()
      .set('rank', {
        sort: noopSort,
        filters: [
          (item: any) => {
            if (item === null) {
              return false
            }

            return item === 'Junior'
          }
        ]
      })
      .set('jobPosition', {
        sort: noopSort,
        filters: [
          (item: any) => {
            if (item === null) {
              return false
            }

            return item === 'Frontend developer'
          }
        ]
      })
      .set('age', {
        sort: (a: number, b: number) => a - b,
        filters: []
      })
    const result: any = tableProcess(data, columns, [ 'age' ])
    expect(result).toBeTruthy()
  })
})
