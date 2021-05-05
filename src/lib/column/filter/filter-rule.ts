export interface FilterRule<T> {
  /**
   * Filtration method
   *
   * Works like {@link Array#filter}. When return TRUE method pass item,
   * otherwise filter item
   *
   * @param item Active item for filtration
   */
  filter(item?: T): boolean
}
