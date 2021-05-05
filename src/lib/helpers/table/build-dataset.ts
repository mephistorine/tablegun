import { buildSeries } from './build-series'

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
