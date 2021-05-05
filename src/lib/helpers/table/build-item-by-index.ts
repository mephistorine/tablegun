export function buildItemByIndex(index: number, dataset: Record<string, any[]>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const columnName in dataset) {
    if (!dataset.hasOwnProperty(columnName)) {
      continue
    }

    const series: any[] = dataset[ columnName ]

    if (!Array.isArray(series)) {
      throw new Error(`Series width columnName="${ columnName }" must be an array`)
    }

    result[ columnName ] = series[ index ]
  }

  return result
}
