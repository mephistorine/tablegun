import { buildSeries } from './build-series'

/**
 * Dataset builder
 *
 * A classic table stores data as rows.
 * The function flips the table and returns a dictionary that stores data in columns
 *
 * ```typescript
 * const data = [
 *   { name: 'Sam', age: 20 },
 *   { name: 'John', age: 22 }
 * ]
 *
 * buildDataSet(data, [ 'name', 'age' ])
 * // > {
 * //   name: [ 'Sam', 'John' ],
 * //   age: [ 20, 22 ]
 * // }
 * ```
 *
 * @param data List of data
 * @param properties List of properties that will be used as keys in the result
 */
export function buildDataSet(data: readonly any[], properties: string[]): Record<string, any[]> {
  const result: Record<string, any[]> = {}

  for (const property of properties) {
    result[ property ] = buildSeries(
      (item: Record<string, any>) => {
        const value: any = item[ property ]

        if (typeof value === 'undefined') {
          throw new Error(`No value for property="${ property }"`)
        }

        return value
      },
      data
    )
  }

  return result
}
