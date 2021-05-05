import { data } from '../../../test-data/repositories-lite.json'
import { buildSeries } from './build-series'

describe(`buildSeries`, () => {
  test(`should return array of names`, () => {
    expect(buildSeries((repo: any) => repo.name, data)).toEqual([
      'angular',
      'vue',
      'react',
      'delta',
      'fnm',
      'hugo',
      'lazygit',
      'aseprite',
      'typescript-generator',
      'web-starter-kit'
    ])
  })
})
