import { buildItemByIndex } from './build-item-by-index'

describe(`buildItemByIndex`, () => {
  test(`should build object by index="0"`, () => {
    const data: { name: string[]; age: number[] } = {
      name: [ 'Sam', 'John' ],
      age: [ 20, 999 ]
    }

    expect(buildItemByIndex(0, data)).toEqual({
      name: 'Sam',
      age: 20
    })
  })

  test(`should throw error when one of series is string`,  () => {
    const data: { name: string[]; age: string } = {
      name: [ 'Sam', 'John' ],
      age: 'hello'
    }

    expect(() => buildItemByIndex(0, data as any)).toThrowError(`Series width columnName="age" must be an array`)
  })
})
