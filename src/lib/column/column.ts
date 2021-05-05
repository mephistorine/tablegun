import { ColumnSortDirection } from './column-sort-direction'
import { FilterRule } from './filter'
import { SortRule } from './sort'

export class Column<T = unknown> {
  private filterRules: Set<FilterRule<T>> = new Set()
  private sortRule: SortRule<T> | null = null

  /**
   * Name of column
   */
  public readonly name: string

  /**
   * Sort direction
   */
  public direction: ColumnSortDirection

  /**
   * Indicates column has sort
   */
  public get hasSort(): boolean {
    return this.sortRule !== null
  }

  /**
   * Indicates column has at least one of filterRule
   */
  public get hasFilters(): boolean {
    return this.filterRules.size > 0
  }

  constructor(name: string, direction: ColumnSortDirection = ColumnSortDirection.default) {
    this.name = name
    this.direction = direction
  }

  /**
   * Column builder
   *
   * @param name Column name
   * @param filters List of filter rules
   * @param sort Sort rule
   * @param direction Sort direction
   */
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

  /**
   * Call sort rule
   *
   * @param a Current item
   * @param b Next item
   */
  public sort(a: T, b: T): number {
    if (this.sortRule === null) {
      throw new Error(`Column width name="${ this.name }" has no sort rule`)
    }

    return this.sortRule.compare(a, b) * this.direction
  }

  /**
   * Call all filters
   *
   * All filters sums by {@link Array#every} when all
   * filters return true it return true, otherwise false
   *
   * When no one filters exists return TRUE
   *
   * @param item Active item for filtration
   * @returns When all filters returns true, then return TRUE, otherwise FALSE
   */
  public filter(item: T): boolean {
    if (this.filterRules.size === 0) {
      return true
    }

    return Array.from(this.filterRules).every((rule: FilterRule<T>) => rule.filter(item))
  }

  /**
   * Set sort rule
   *
   * @param sortRule Sort rule or null
   */
  public setSort(sortRule: SortRule<T> | null): void {
    this.sortRule = sortRule
  }

  /**
   * Take sort rule or null
   *
   * @returns Sort rule or null
   */
  public takeSort(): SortRule<T> | null {
    return this.sortRule
  }

  /**
   * Add filtration
   *
   * @param filterRule
   */
  public addFilter(filterRule: FilterRule<T>): void {
    this.filterRules.add(filterRule)
  }

  /**
   * Remove filtration
   *
   * @param filterRule
   */
  public removeFilter(filterRule: FilterRule<T>): void {
    this.filterRules.delete(filterRule)
  }

  /**
   * Take all filters
   *
   * @returns Readonly list of filters
   */
  public takeAllFilters(): readonly FilterRule<T>[] {
    return Array.from(this.filterRules)
  }

  /**
   * Set sort direction
   *
   * @param direction Sort direction
   */
  public setDirection(direction: ColumnSortDirection): void {
    this.direction = direction
  }
}
