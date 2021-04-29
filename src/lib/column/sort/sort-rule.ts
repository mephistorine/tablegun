export interface SortRule<T> {
  compare(a?: T, b?: T): number
}
