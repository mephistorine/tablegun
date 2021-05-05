import { data } from '../../test-data/repositories-lite.json'
import { Column, ColumnSortDirection } from './column'
import { Table } from './table'

describe(`Table`, () => {
  test(`should filter only Typescript projects`, () => {
    const columns: Column[] = [
      Column.build('language', [
        { filter: (language: string) => language === 'TypeScript' }
      ])
    ]

    const table: Table<any> = new Table(columns)
    expect(table.calculate(data).map((repo: any) => repo.language)).toEqual([ 'TypeScript' ])
  })

  test(`should filter when stars count greater than 50_000`, () => {
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
  })

  test(`should filter repos when created time year after or equal 2016`, () => {
    const columns: Column[] = [
      Column.build('created_at', [
        { filter: (createdAt: string) => new Date(createdAt).getFullYear() >= 2016 }
      ])
    ]

    const table: Table<any> = new Table(columns)
    expect(table.calculate(data).map((repo: any) => repo.name)).toEqual([
      'delta',
      'fnm',
      'lazygit'
    ])
  })

  test(`should sort by open_issues_count ascending`, () => {
    const columns: Column[] = [
      Column.build(
        'open_issues_count',
        [],
        { compare: (a: number, b: number) => a - b }
      )
    ]

    const table: Table<any> = new Table(columns)
    expect(table.calculate(data).map((repo: any) => repo.name)).toEqual([
      'fnm',
      'typescript-generator',
      'web-starter-kit',
      'delta',
      'lazygit',
      'vue',
      'hugo',
      'react',
      'aseprite',
      'angular'
    ])
  })

  test(`should sort by open_issues_count descending`, () => {
    const columns: Column[] = [
      Column.build(
        'open_issues_count',
        [],
        { compare: (a: number, b: number) => a - b },
        ColumnSortDirection.invert
      )
    ]

    const table: Table<any> = new Table(columns)
    expect(table.calculate(data).map((repo: any) => repo.name)).toEqual([
      'angular',
      'aseprite',
      'react',
      'hugo',
      'vue',
      'lazygit',
      'delta',
      'web-starter-kit',
      'typescript-generator',
      'fnm'
    ])
  })

  test(`should sort alphabetic by name`, () => {
    const columns: Column[] = [
      Column.build(
        'name',
        [],
        {
          compare: (a: string, b: string) => {
            if (a < b) {
              return -1
            }

            if (a > b) {
              return 1
            }

            return 0
          }
        }
      )
    ]

    const table: Table<any> = new Table(columns)
    expect(table.calculate(data).map((repo: any) => repo.name)).toEqual([
      'angular',
      'aseprite',
      'delta',
      'fnm',
      'hugo',
      'lazygit',
      'react',
      'typescript-generator',
      'vue',
      'web-starter-kit'
    ])
  })

  test(`should sort alphabetic by name descending`, () => {
    const columns: Column[] = [
      Column.build(
        'name',
        [],
        {
          compare: (a: string, b: string) => {
            if (a < b) {
              return -1
            }

            if (a > b) {
              return 1
            }

            return 0
          }
        },
        ColumnSortDirection.invert
      )
    ]

    const table: Table<any> = new Table(columns)
    expect(table.calculate(data).map((repo: any) => repo.name)).toEqual([
      'web-starter-kit',
      'vue',
      'typescript-generator',
      'react',
      'lazygit',
      'hugo',
      'fnm',
      'delta',
      'aseprite',
      'angular'
    ])
  })

  test(`should sort by default_branch and forks_count`, () => {
    const columns: Column[] = [
      Column.build('default_branch', [], {
        compare: (a: string, b: string) => {
          if (a === b) {
            return 0
          }

          if (a === 'master') {
            return -1
          }

          return 1
        }
      }),
      Column.build('forks_count', [], {
        compare: (a: number, b: number) => a - b
      })
    ]

    const table: Table<any> = new Table(columns)
    const result: readonly any[] = table.calculate(data).map((item: any) => {
      return {
        name: item.name,
        defaultBranch: item.default_branch,
        forksCount: item.forks_count
      }
    })

    expect(result).toEqual([
      { name: 'fnm', defaultBranch: 'master', forksCount: 114 },
      { name: 'delta', defaultBranch: 'master', forksCount: 139 },
      { name: 'lazygit', defaultBranch: 'master', forksCount: 750 },
      { name: 'web-starter-kit', defaultBranch: 'master', forksCount: 3185 },
      { name: 'hugo', defaultBranch: 'master', forksCount: 5773 },
      { name: 'angular', defaultBranch: 'master', forksCount: 19101 },
      { name: 'react', defaultBranch: 'master', forksCount: 33759 },
      { name: 'vue', defaultBranch: 'dev', forksCount: 28881 },
      { name: 'typescript-generator', defaultBranch: 'main', forksCount: 171 },
      { name: 'aseprite', defaultBranch: 'main', forksCount: 1143 }
    ])
  })
})
