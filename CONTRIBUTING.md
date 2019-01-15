# Contributing Guidelines

## Important

1. Do not commit on `master` or `development` or `gh-pages` branches.
2. Branch `development` is where our base code resides and will allow us to beta test.
3. Branch `master` is where we can find **Hustle UI Library** compiled assets. You should never push directly to this branch.
4. Branch `gh-pages` contains only public files that handle demo site. You should never push directly to this branch.

## Workflow

1. Create a new branch from `development` branch using a descriptive name, for example:
	* `new/modal-box` for new features.
	* `enhance/modal-box` for improvements.
	* `fix/modal-box` for bugfixing.
2. Make your commits and push to the new branch you created.
3. File the new pull request agains `development` branch.
4. Assign someone to review your code.
5. Once the PR is approved, the assigned reviewer will merge your changes in `development` branch.
6. Delete your branch locally and make sure it does not exist remote.

**Remember:** It is a good idea to create a Pull Request as soon as possible so everybody knows what's going on with the project from the PRs screen in Bitbucket.

## Command Line

1. Install node. It's recommended to install `nvm` to switch between node versions.
2. Execute `npm install` in root project folder to install all necessary packages.
3. Execute `npm run start` to watch css and js changes. The demo file will then automatically be served up by [Browsersync](https://browsersync.io/). All changes made will automatically be watched and the page live reloaded when changes are made.

## Updating Hustle UI Library

Requirements:

* Must be a developer member of the [WPMU DEV Organization](https://github.com/orgs/wpmudev/people).
* Must be on `development` branch with a clean working directory.

**Note:** The following commands handle all aspects of releasing the next version. Once ran, they will build all necessary files that corresponds to the semver version, commit them and publish to the correct branch.

### Library Release

```
npm run deploy:hustle
```

### Showcase Release

```
npm run deploy:demo
```

**Important:** Remember to always run both commands since we need library and showcase show the same latest assets.