import { data } from '../../../../test-data/repositories-lite.json'
import { buildDataSet } from './build-dataset'

describe(`buildDataSet`, () => {
  test(`should build dataset of Github repositories`, () => {
    expect(buildDataSet(data, [ 'default_branch', 'name', 'language' ])).toEqual({
      default_branch: [ 'master', 'dev', 'master', 'master', 'master', 'master', 'master', 'main', 'main', 'master' ],
      name: [ 'angular', 'vue', 'react', 'delta', 'fnm', 'hugo', 'lazygit', 'aseprite', 'typescript-generator', 'web-starter-kit' ],
      language: [ 'TypeScript', 'JavaScript', 'JavaScript', 'Rust', 'Rust', 'Go', 'Go', 'C++', 'Java', 'HTML' ]
    })
  })

  test(`should throw error when value by property not exist`, () => {
    const data: object[] = [
      {
        name: 'Sam',
        age: 20
      },
      {
        name: 'John',
        age: 30
      }
    ]

    expect(() => buildDataSet(data, [ 'name', 'age', 'job' ])).toThrowError(`No value for property="job"`)
  })
})
