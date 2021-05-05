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
