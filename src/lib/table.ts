export interface Column {
  filters: ((item: any) => boolean)[]
  sort: (a: any, b: any) => number
}

type Dictionary = { [key in string]: any }

export function buildSeries(takeValue: (data: { [key: string]: any }) => any, data: Dictionary[]): any[] {
  const result: any[] = []

  for (const item of data) {
    result.push(takeValue(item))
  }

  return result
}

export function takeItemByIndex(index: number, dataset: Record<string, any[]>): Record<string, any> {
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

export function buildDataSet(data: Dictionary[], properties: string[]): Record<string, any[]> {
  const result: Record<string, any[]> = {}

  for (const property of properties) {
    result[ property ] = buildSeries((item: Dictionary) => item[ property ], data)
  }

  return result
}

export function noopSort(): number {
  return 0
}

function isUndefined(matchObject: any): matchObject is undefined {
  return typeof matchObject === 'undefined'
}

function isNull(matchObject: any): matchObject is null {
  return matchObject === null
}

export function tableProcess(data: Dictionary[], columns: Map<string, Column>, sortOrder: string[]): any {
  const INDEXES: Set<number> = new Set(data.map((_: Dictionary, index: number) => index))
  const dataset: Record<string, any[]> = buildDataSet(data, Object.keys(data[ 0 ]))

  for (const index of INDEXES) {
    for (const columnName in dataset) {
      if (!dataset.hasOwnProperty(columnName)) {
        continue
      }

      const columnSetting: Column | undefined = columns.get(columnName)

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

  return Array.from(INDEXES).map((index: number) => takeItemByIndex(index, dataset))

  /*const filterIndexes: Set<number> = new Set(data.map((_: Dictionary, index: number) => index))
  const dataset: Record<string, any> = buildDataSet(data, Object.keys(data[ 0 ]))

  for (const key in dataset) {
    const series: any[] = dataset[ key ]
    const column: Column | undefined = columns.get(key)

    if (typeof column !== 'undefined') {
      let i: number = 0
      for (const item of series) {
        if (!filterIndexes.has(i)) {
          continue
        }

        const filterResult: boolean | undefined = column.filters?.every((filter: (item: any) => boolean) => filter(item))
        if (!filterResult) {
          filterIndexes.delete(i)
        }
        i++
      }
    }
  }*/

  // return Array.from(filterIndexes.values()).map((index: number) => data[ index ])

  /*for (const columnName of sortOrder) {
    const series: any[] = dataset[ columnName ]
    const column: Column | undefined = columns.get(columnName)
    if (typeof column !== 'undefined') {
      const sortFunc: ((a: any, b: any) => number) | null = column.sort
      if (sortFunc !== null) {
        series.slice().sort((a: any, b: any) => {
          const sortResult: number = sortFunc(a, b)

          if (sortResult !== 0) {
            return sortResult
          }


        })
      }
    }
  }*/

  /*
  for (const key in dataset) {
    const series: any[] = dataset[ key ]
    const column: Column | undefined = columns.get(key)

    if (typeof column !== 'undefined') {
      const sortFunc: ((a: any, b: any) => number) | null = column.sort
      if (sortFunc !== null) {
        const sortedSeries: any[] = series.slice().sort((a: any, b: any) => sortFunc(a, b))
      }
    }
  }*/

}

/*const data: object[] = [
  {
    name: 'Sam',
    age: 20,
    jobPosition: 'Frontend developer',
    rank: 'Middle'
  },
  {
    name: 'Ilya',
    age: 22,
    jobPosition: 'Backend developer',
    rank: 'Middle'
  },
  {
    name: 'Alexandr',
    age: 35,
    jobPosition: 'Frontend developer',
    rank: 'Junior'
  },
  {
    name: 'Suren',
    age: 26,
    jobPosition: 'Backend developer',
    rank: 'Junior'
  },
  {
    name: 'Ivan',
    age: 29,
    jobPosition: 'Chief Technical Officer',
    rank: null
  }
]*/

/*
export class TableControl<T extends Record<string | number, unknown>> {
  constructor(private data: readonly T[],
              private columns: Column<unknown>[]) {
  }

  public calculate(): void {

  }
}

interface SeriesRepresentation<R, T> {
  key: R
  value: T[]
}

export function buildDataset<T extends Record<string, unknown>, R extends keyof T>(data: readonly T[]): Map<R, T[ R ][]> {
  const result: Map<R, T[ R ][]> = new Map()

  for (const item of data) {
    for (const itemKey in item) {
      if (result.has(itemKey)) {
        result.get(itemKey)?.push(item[ itemKey ])
        continue
      }

      result.set(itemKey, [])
    }
  }

  return result
}
*/
