# Contributing to Tablegun

Here are the rules for helping in project development and how the new version is released.

## Project

### Run and testing

In [package.json](package.json) we have some scripts:

| Script name | Description |
|----|----|
| `test` | Run all tests |
| `build` | Build all |
| `lint` | Lint project |
| `build:main` | Build source for classic usage |
| `build:module` | Build source with ES2015 modules |
| `build:docs` | Build [typedoc](typedoc.org) docs |
| `ci` | Not used anywhere! Used for start most important scripts |

### Git

#### Branch name format

All branches are named with the following format:

```text
issue-123
```

where *123* your issue number

#### Commit message format

We have very precise rules over how our Git commit messages must be formatted. This format leads to easier to read commit history.

Each commit message consists of a header, a body, and a footer.

```text
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

##### Commit message header

```text
<type>: <short summary> (#<issue-number>)
  │           │
  │           └─> Summary in present tense. Not capitalized. No period at the end.
  │
  └─> Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```
The `<type>` and `<summary>` fields are mandatory

###### Type

Must be one of the following:

| Type | Description |
|---|---|
| build | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
| ci | Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs) |
| docs | Documentation only changes |
| feat | A new feature |
| fix | A new feature |
| perf | A code change that improves performance |
| refactor | A code change that neither fixes a bug nor adds a feature |
| test | Adding missing tests or correcting existing tests |

###### Summary

Use the summary field to provide a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

##### Commit message body

Just as in the summary, use the imperative, present tense: "fix" not "fixed" nor "fixes".

Explain the motivation for the change in the commit message body. This commit message should explain why you are making the change. You can include a comparison of the previous behavior with the new behavior in order to illustrate the impact of the change.

##### Commit message footer

The footer can contain information about breaking changes and is also the place to reference GitHub issues, Jira tickets, and other PRs that this commit closes or is related to.

```text
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue-number>
```

Breaking Change section should start with the phrase "BREAKING CHANGE: " followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.

### Version release

Instruction for version release:

1. Merge PR in `dev` branch
2. On the `dev` branch run
    ```bash
     npm version <new-version> -m 'chore: Bumb version to %s'
    ```
3. Push commit and tags
    ```bash
    git push && git push --tags 
    ```
4. Merge `dev` branch into `stable`

After PR reviewed and approved PR branch merged in `dev` branch

## Submitting

### Issue

Before sending an issue, make sure that such an issue has not already been created by someone. If there were no such issues, then you can [create an issue](https://github.com/mephistorine/tablegun/issues/new).

### Pull request

To submit a PR you must follow the following steps

1. Check if a PR with that issue has not already been created
2. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) the *mephistorine/tablegun* repo
3. In your forked repository, make your changes in a new git branch with name that follows our [branch naming rules](#branch-name-format):
    ```bash
    git checkout -b issue-9 dev
    ```
4. Create your patch, **including appropriate test cases**.
5. Run all test, as described in the [testing documentation](#run-and-testing), and ensure that all tests pass.
6. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit-message-format).
7. Push your branch to GitHub:
    ```bash
    git push origin issue-9
    ```
8. In GitHub, send a pull request to `tablegun:dev`
