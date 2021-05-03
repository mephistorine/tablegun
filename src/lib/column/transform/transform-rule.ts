export interface TransformRule<T, R = any> {
  transform(value: T): R
}
