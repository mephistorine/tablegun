import { Column } from '../../column'

/**
 * Sort array by multi columns
 *
 * @param a Item A
 * @param b Item B
 * @param columns List of Column class
 * @param dataset Dataset
 * @returns Number of array sort method
 */
export function multiColumnSortRecursively(a: number, b: number, columns: Column[], dataset: Record<string, unknown[]>): number {
  const [ currentColumn, ...other ] = columns
  const series: unknown[] = dataset[ currentColumn.name ]
  const result: number = currentColumn.hasSort ? currentColumn.sort(series[ a ], series[ b ]) : 0

  if (result === 0 && other.length > 0) {
    return multiColumnSortRecursively(a, b, other, dataset)
  }

  return result
}
