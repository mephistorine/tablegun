import { ColumnSortDirection } from './column-sort-direction'
import { FilterRule } from './filter'
import { NOOP_SORT, SortRule } from './sort'

export class Column<T> {
  private filterRules: Set<FilterRule<T>> = new Set()
  private sortRule: SortRule<T> | null = null

  constructor(public readonly name: string,
              public direction: ColumnSortDirection = 1) {
  }

  public static build<R>(
    name: string,
    direction: ColumnSortDirection = 1,
    filters: FilterRule<unknown>[] = [],
    sort: SortRule<unknown> | null = null
  ): Column<R> {
    const column: Column<R> = new Column(name, direction)
    filters.forEach((filterRule: FilterRule<unknown>) => column.addFilter(filterRule))
    column.setSort(sort)
    return column
  }

  public compare(a: T, b: T): number {
    if (this.sortRule === null) {
      return NOOP_SORT.compare()
    }

    return this.sortRule.compare(a, b) * this.direction
  }

  public setSort(sortRule: SortRule<T> | null): void {
    this.sortRule = sortRule
  }

  public filter(item: T): boolean {
    return Array.from(this.filterRules).every((rule: FilterRule<T>) => rule.filter(item))
  }

  public addFilter(filterRule: FilterRule<T>): void {
    this.filterRules.add(filterRule)
  }

  public removeFilter(filterRule: FilterRule<T>): void {
    this.filterRules.delete(filterRule)
  }

  public setDirection(direction: 1 | -1): void {
    this.direction = direction
  }

  /*  public buildSeries<R>(dataset: R[]): T[] {

    }*/
}
