# Enrollments

Web components to be used with `enrollments` entities!

`master` contains Polymer 3 entities which can be used with an enrollment entity from the Brightspace Hypermedia APIs.

`hybrid` contains Polymer 1/2 hybrid entities for use with the same entities. With time, this branch will eventually see less usage, as we come to support the newer versions of Polymer, and move things over. For now, though, most elements and changes will be present in this branch.

## Developing

After cloning the repo, run `npm install` to install dependencies.

### Running the demos

`npm start`

## Versioning & Releasing

All version changes should obey [semantic versioning](https://semver.org/) rules.

Releases use the [semantic-release](https://semantic-release.gitbook.io/) tooling and the [angular preset](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) for commit message syntax. Upon release, the version in `package.json` is updated and a tag and GitHub release is created.

Commits prefixed with `feat` will trigger a minor release, while `fix` or `perf` will trigger a patch release. A commit containing `BREAKING CHANGE` will cause a major release to occur.

Other useful prefixes that will not trigger a release: `build`, `ci`, `docs`, `refactor`, `style` and `test`. More details in the [Angular Contribution Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type).
