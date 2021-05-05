import { ColumnSortDirection } from './column-sort-direction'
import { FilterRule } from './filter'
import { SortRule } from './sort'

export class Column<T = unknown> {
  private filterRules: Set<FilterRule<T>> = new Set()
  private sortRule: SortRule<T> | null = null

  public get hasSort(): boolean {
    return this.sortRule !== null
  }

  public get hasFilters(): boolean {
    return this.filterRules.size > 0
  }

  constructor(public readonly name: string,
              public direction: ColumnSortDirection = 1) {
  }

  public static build<R>(
    name: string,
    filters: FilterRule<unknown>[] = [],
    sort: SortRule<unknown> | null = null,
    direction: ColumnSortDirection = ColumnSortDirection.default
  ): Column<R> {
    const column: Column<R> = new Column(name, direction)
    filters.forEach((filterRule: FilterRule<unknown>) => column.addFilter(filterRule))
    column.setSort(sort)
    return column
  }

  public compare(a: T, b: T): number {
    if (this.sortRule === null) {
      throw new Error(`Column width name="${ this.name }" has no sort rule`)
    }

    return this.sortRule.compare(a, b) * this.direction
  }

  public filter(item: T): boolean {
    if (this.filterRules.size === 0) {
      return true
    }

    return Array.from(this.filterRules).every((rule: FilterRule<T>) => rule.filter(item))
  }

  public setSort(sortRule: SortRule<T> | null): void {
    this.sortRule = sortRule
  }

  public takeSort(): SortRule<T> | null {
    return this.sortRule
  }

  public addFilter(filterRule: FilterRule<T>): void {
    this.filterRules.add(filterRule)
  }

  public removeFilter(filterRule: FilterRule<T>): void {
    this.filterRules.delete(filterRule)
  }

  public takeAllFilters(): readonly FilterRule<T>[] {
    return Array.from(this.filterRules)
  }

  public setDirection(direction: ColumnSortDirection): void {
    this.direction = direction
  }

}
