import { Column } from './column'
import { buildDataSet, buildItemByIndex } from './helpers'
import { multiColumnSortRecursively } from './helpers/table/multi-column-sort-recursively'

export class Table<T> {
  constructor(
    /**
     * Column list
     *
     * @private
     */
    private readonly columns: Column[] = []
  ) {
  }

  /**
   * Processes data applying all filtering and sorting rules
   *
   * @param data Array of processing items. Each item must be object
   */
  public calculate(data: readonly T[]): readonly T[] {
    /**
     * We assume that all data is consistent,
     * so we take the list of columns from the first element in the list
     */
    const properties: string[] = Object.keys(data[ 0 ])
    const dataset: Record<string, unknown[]> = buildDataSet(data, properties)

    const INDEXES: Set<number> = new Set(data.map((_: Record<string, any>, index: number) => index))

    for (const currentIndex of INDEXES) {
      for (const column of this.columns) {
        const series: unknown[] | undefined = dataset[ column.name ]

        if (typeof series === 'undefined') {
          continue // Add console warn about absence series
          // throw new Error(`Series with column name="${ column.name }"`)
        }

        const item: unknown = series[ currentIndex ]

        if (!column.filter(item)) {
          INDEXES.delete(currentIndex)
        }
      }
    }

    return Array
      .from(INDEXES)
      .sort((a: number, b: number) => multiColumnSortRecursively(a, b, this.columns, dataset))
      .map((index: number) => buildItemByIndex(index, dataset)) as readonly T[]
  }
}
