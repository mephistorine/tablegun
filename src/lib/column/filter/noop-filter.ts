import { FilterRule } from './filter-rule'

export class NoopFilter implements FilterRule<unknown> {
  public filter(): boolean {
    return false
  }
}

export const NOOP_FILTER: FilterRule<unknown> = new NoopFilter()
