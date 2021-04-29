import { SortRule } from './sort-rule'

export class NoopSort implements SortRule<unknown> {
  public compare(): number {
    return 0
  }
}

export const NOOP_SORT: SortRule<unknown> = new NoopSort()
