export function buildSeries(takeValue: (data: { [key: string]: any }) => any, data: readonly Record<string, any>[]): any[] {
  const result: any[] = []

  for (const item of data) {
    result.push(takeValue(item))
  }

  return result
}
