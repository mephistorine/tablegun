import { Column } from './column'
import { buildDataSet, buildItemByIndex } from './helpers'

export class Table<T> {
  constructor(
    /**
     * @todo Add possibility for add/remove columns
     */
    private readonly columns: Column[] = []
  ) {
  }

  private static multiColumnSort(a: number, b: number, columns: Column[], dataset: Record<string, unknown[]>): number {
    const [ currentColumn, ...other ] = columns
    const series: unknown[] = dataset[ currentColumn.name ]
    const result: number = currentColumn.hasSort ? currentColumn.compare(series[ a ], series[ b ]) : 0

    if (result === 0 && other.length > 0) {
      return Table.multiColumnSort(a, b, other, dataset)
    }

    return result
  }

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
      .sort((a: number, b: number) => Table.multiColumnSort(a, b, this.columns, dataset))
      .map((index: number) => buildItemByIndex(index, dataset)) as readonly T[]
  }
}
