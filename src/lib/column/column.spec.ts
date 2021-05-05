import { data } from '../../../test-data/repositories-lite.json'
import { buildSeries } from '../helpers'

import { Column } from './column'
import { ColumnSortDirection } from './column-sort-direction'
import { FilterRule } from './filter'
import { SortRule } from './sort'

describe(`Column`, () => {
  class NumberSortRule implements SortRule<number> {
    public compare(a: number, b: number): number {
      return a - b
    }
  }

  describe(`Sorts`, () => {
    test(`should sort array of numbers`, () => {
      const column: Column<number> = new Column('forksCount')
      column.setSort(new NumberSortRule())

      const series: number[] = buildSeries((repo: any) => repo.forks_count, data)
      expect(series.slice().sort((a: number, b: number) => column.compare(a, b))).toEqual([
        114,
        139,
        171,
        750,
        1143,
        3185,
        5773,
        19101,
        28881,
        33759
      ])
    })

    test(`should sort array of numbers descending through constructor`, () => {
      const column: Column<number> = new Column('forksCount', ColumnSortDirection.invert)
      column.setSort(new NumberSortRule())

      const series: number[] = buildSeries((repo: any) => repo.forks_count, data)
      expect(series.slice().sort((a: number, b: number) => column.compare(a, b))).toEqual([
        33759,
        28881,
        19101,
        5773,
        3185,
        1143,
        750,
        171,
        139,
        114
      ])
    })

    test(`should sort array of numbers descending through setDirection method`, () => {
      const column: Column<number> = new Column('forksCount')
      column.setSort(new NumberSortRule())
      column.setDirection(ColumnSortDirection.invert)

      const series: number[] = buildSeries((repo: any) => repo.forks_count, data)
      expect(series.slice().sort((a: number, b: number) => column.compare(a, b))).toEqual([
        33759,
        28881,
        19101,
        5773,
        3185,
        1143,
        750,
        171,
        139,
        114
      ])
    })

    test(`should throw error when has not sortRule`, () => {
      const column: Column<number> = new Column('forksCount')
      const series: number[] = buildSeries((repo: any) => repo.forks_count, data)

      expect(() => series.slice().sort((a: number, b: number) => column.compare(a, b))).toThrowError(`Column width name="forksCount" has no sort rule`)
    })

    test(`hasSort should return true when sortRule exist`, () => {
      const column: Column<number> = new Column('forksCount')
      column.setSort(new NumberSortRule())
      expect(column.hasSort).toBeTruthy()
    })

    test(`takeSort should return sortRule or null`, () => {
      const column: Column<number> = new Column('forksCount')
      column.setSort(new NumberSortRule())
      expect(column.takeSort()).toBeInstanceOf(NumberSortRule)
    })

    test(`takeSort should return sortRule or null`, () => {
      const column: Column<number> = new Column('forksCount')
      expect(column.takeSort()).toBeNull()
    })

    test(`hasSort should return false when sortRule not exist`, () => {
      const column: Column<number> = new Column('forksCount')
      expect(column.hasSort).toBeFalsy()
    })
  })

  describe(`Filters`, () => {
    test(`should filter repos with forks count greater than 2000`, () => {
      const column: Column<number> = new Column('forksCount')
      column.addFilter({ filter: (forksCount: number) => forksCount > 2000 })
      const series: number[] = buildSeries((repo: any) => repo.forks_count, data)
      expect(series.filter((item: number) => column.filter(item))).toEqual([
        19101,
        28881,
        33759,
        5773,
        3185
      ])
    })

    test(`should remove filterRule`, () => {
      const column: Column<number> = new Column('forksCount')
      const filterRule: FilterRule<number> = { filter: (forksCount: number) => forksCount > 2000 }
      column.addFilter(filterRule)
      expect(column.takeAllFilters()).toHaveLength(1)
      column.removeFilter(filterRule)
      expect(column.takeAllFilters()).toHaveLength(0)
    })

    test(`hasFilters should return true when at least one filterRule exists`, () => {
      const column: Column<number> = new Column('forksCount')
      const filterRule: FilterRule<number> = { filter: (forksCount: number) => forksCount > 2000 }
      column.addFilter(filterRule)
      expect(column.hasFilters).toBeTruthy()
    })

    test(`hasFilters should return false when no one filterRules not exists`, () => {
      const column: Column<number> = new Column('forksCount')
      expect(column.hasFilters).toBeFalsy()
    })

    test(`filter method should return true when no one filterRules not exists`, () => {
      const column: Column<number> = new Column('forksCount')
      const series: number[] = buildSeries((repo: any) => repo.forks_count, data)
      expect(series.filter((item: number) => column.filter(item))).toEqual(series)
    })

    test(`should take all filterRules`, () => {
      const column: Column<number> = new Column('forksCount')
      const filterRule: FilterRule<number> & { name: string } = {
        name: 'test-filter-name',
        filter: (forksCount: number) => forksCount > 2000
      }

      column.addFilter(filterRule)
      expect(column.takeAllFilters()).toContainEqual(filterRule)
    })
  })

  describe(`Builder`, () => {
    test(`should create a column with already preset filterRules`, () => {
      const testFilterRule: FilterRule<number> = { filter: (forksCount: number) => forksCount > 2000 }
      const column: Column<number> = Column.build<number>(
        'forksCount',
        Array.of(testFilterRule)
      )

      expect(column.name).toBe('forksCount')
      expect(column.takeAllFilters()).toContain(testFilterRule)
    })

    test(`should create a column with already preset sortRule`, () => {
      const testSortRule: SortRule<number> = new NumberSortRule()
      const column: Column<number> = Column.build<number>(
        'forksCount',
        [],
        testSortRule
      )

      expect(column.name).toBe('forksCount')
      expect(column.takeSort()).toEqual(testSortRule)
    })

    test(`should create a column with already preset sortRule and direction`, () => {
      const testSortRule: SortRule<number> = new NumberSortRule()
      const column: Column<number> = Column.build<number>(
        'forksCount',
        [],
        testSortRule,
        ColumnSortDirection.invert
      )

      expect(column.name).toBe('forksCount')
      expect(column.takeSort()).toEqual(testSortRule)
      expect(column.direction).toEqual(ColumnSortDirection.invert)
    })

    test(`should create a column with already preset filterRules, sortRule and direction`, () => {
      const testSortRule: SortRule<number> = new NumberSortRule()
      const testFilterRule: FilterRule<number> = { filter: (forksCount: number) => forksCount > 2000 }
      const column: Column<number> = Column.build<number>(
        'forksCount',
        Array.of(testFilterRule),
        testSortRule,
        ColumnSortDirection.invert
      )

      expect(column.name).toBe('forksCount')
      expect(column.takeSort()).toEqual(testSortRule)
      expect(column.takeAllFilters()).toContain(testFilterRule)
      expect(column.direction).toEqual(ColumnSortDirection.invert)
    })
  })
})
