export interface SortRule<T> {
  /**
   * Sort method
   *
   * Works like {@link Array#sort}
   *
   * @param a Current item
   * @param b Next item
   */
  compare(a?: T, b?: T): number
}
