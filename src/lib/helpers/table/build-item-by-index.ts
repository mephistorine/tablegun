/**
 * Build entity by index
 *
 * Build entity by index from dataset
 *
 * ```typescript
 * buildItemByIndex(0, {
 *   name: [ 'Sam', 'John' ],
 *   age: [ 20, 22 ]
 * })
 * // > {
 * //   name: 'Sam',
 * //   age: 20
 * // }
 * ```
 *
 * @param index Array index
 * @param dataset Dataset
 *
 * @see buildDataSet
 * @returns Entity
 */
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
