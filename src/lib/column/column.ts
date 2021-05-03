import { ColumnSortDirection } from './column-sort-direction'
import { FilterRule } from './filter'
import { SortRule } from './sort'
import { TransformRule } from './transform'

export class Column<T> {
  private filterRules: Set<FilterRule<T>> = new Set()
  private transformRule: TransformRule<T> | null = null
  private sortRule: SortRule<T> | null = null

  public get hasSort(): boolean {
    return this.sortRule !== null
  }

  public get hasFilters(): boolean {
    return this.filterRules.size > 0
  }

  public get hasTransform(): boolean {
    return this.transformRule !== null
  }

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

  public transform(item: T): any {
    if (this.transformRule === null) {
      throw new Error(`Column width name="${ this.name }" has no transform rule`)
    }

    return this.transformRule.transform(item)
  }

  public setSort(sortRule: SortRule<T> | null): void {
    this.sortRule = sortRule
  }

  public setTransform(transformRule: TransformRule<T>): void {
    this.transformRule = transformRule
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
