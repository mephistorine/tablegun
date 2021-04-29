export interface FilterRule<T> {
  filter(item?: T): boolean
}
