/**
 * This if config file for [Danger](https://danger.systems/js)
 */

import { danger } from 'danger'

if (danger.github.pr.base.ref !== 'dev') {
  fail(`We only accept PRs to "dev" branch.`)
}
