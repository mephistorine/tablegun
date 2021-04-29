import { Column } from './column/column'

export interface ColumnDepric {
  filters: ((item: any) => boolean)[]
  sort: (a: any, b: any) => number
}

type Dictionary = { [key in string]: any }

export function buildSeries(takeValue: (data: { [key: string]: any }) => any, data: readonly Dictionary[]): any[] {
  const result: any[] = []

  for (const item of data) {
    result.push(takeValue(item))
  }

  return result
}

export function buildItemByIndex(index: number, dataset: Record<string, any[]>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const columnName in dataset) {
    if (!dataset.hasOwnProperty(columnName)) {
      continue
    }

    const series: any[] = dataset[ columnName ]
    result[ columnName ] = series[ index ]
  }

  return result
}

export function buildDataSet(data: readonly any[], properties: string[]): Record<string, any[]> {
  const result: Record<string, any[]> = {}

  for (const property of properties) {
    result[ property ] = buildSeries((item: Dictionary) => item[ property ], data)
  }

  return result
}

function isUndefined(matchObject: any): matchObject is undefined {
  return typeof matchObject === 'undefined'
}

/*function isNull(matchObject: any): matchObject is null {
  return matchObject === null
}*/

export function tableProcess(data: Dictionary[], columns: Map<string, ColumnDepric>, sortOrder: string[]): any {
  const INDEXES: Set<number> = new Set(data.map((_: Dictionary, index: number) => index))
  const dataset: Record<string, any[]> = buildDataSet(data, Object.keys(data[ 0 ]))

  for (const index of INDEXES) {
    for (const columnName in dataset) {
      if (!dataset.hasOwnProperty(columnName)) {
        continue
      }

      const columnSetting: ColumnDepric | undefined = columns.get(columnName)

      if (isUndefined(columnSetting)) {
        continue
      }

      if (columnSetting.filters.length <= 0) {
        continue
      }

      const series: any[] = dataset[ columnName ]
      const item: any = series[ index ]

      const isItemBeFiltered: boolean | undefined = columnSetting.filters.every((filter: (item: any) => boolean) => filter(item))

      if (!isItemBeFiltered) {
        INDEXES.delete(index)
      }
    }
  }

  const sort: any = (a: number, b: number, sortOrder: string[], columns: Map<string, ColumnDepric>, dataset: Record<string, any[]>): number => {
    const [ current, ...other ]: string[] = sortOrder

    const columnSetting: ColumnDepric | undefined = columns.get(current)

    if (isUndefined(columnSetting)) {
      return 0
    }

    const series: any[] = dataset[ current ]

    const sortResult: number = columnSetting.sort(series[ a ], series[ b ])

    if (sortResult === 0) {
      return sort(a, b, other, columns, dataset)
    }

    return sortResult
  }

  const sorted: number[] = Array.from(INDEXES).sort((a: number, b: number) => sort(a, b, sortOrder, columns, dataset))

  return sorted.map((index: number) => buildItemByIndex(index, dataset))
}

export class Table<T> {
  constructor(private columns: Column<unknown>[]) {
  }

  public calculate(data: readonly T[]): readonly T[] {
    const properties: string[] = this.columns.map((column: Column<unknown>) => column.name)
    const dataset: Record<string, unknown[]> = buildDataSet(data, properties)

    const INDEXES: Set<number> = new Set(data.map((_: Dictionary, index: number) => index))

    for (const currentIndex of INDEXES) {
      for (const column of this.columns) {
        const series: unknown[] | undefined = dataset[ column.name ]

        if (typeof series === 'undefined') {
          continue // Add console warn about absence series
          // throw new Error(`Series with column name="${ column.name }"`)
        }

        const item: unknown = series[ currentIndex ]

        if (column.filter(item)) {
          INDEXES.delete(currentIndex)
        }
      }
    }

    return Array
      .from(INDEXES)
      .sort((a: number, b: number) => Table.multiColumnSort(a, b, this.columns, dataset))
      .map((index: number) => buildItemByIndex(index, dataset)) as readonly T[]
  }

  private static multiColumnSort(a: number, b: number, columns: Column<unknown>[], dataset: Record<string, unknown[]>): number {
    const [ currentColumn, ...other ] = columns
    const series: unknown[] = dataset[ currentColumn.name ]
    const result: number = currentColumn.compare(series[ a ], series[ b ])

    if (result === 0) {
      return  Table.multiColumnSort(a, b, other, dataset)
    }

    return result
  }
}
