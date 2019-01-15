# Hustle UI Library
For internal use in [WPMU DEV](https://wpmudev.org/) plugins.

## Usage

See our [showcase](https://wpmudev.github.io/hustle-ui/).

## Contributing

Please read through our [contributing guidelines](https://github.com/wpmudev/hustle-ui/blob/development/CONTRIBUTING.md).

## Release

1. Review and merge all PRs into `development` branch.
2. You will need to be added as member of [WPMU DEV Organization](https://github.com/orgs/wpmudev/people) before the next step.
3. Execute `git checkout development`
4. Assign the correct version executing `git tag v4.0.0`. Replace the version number with the correspondent new version.
5. Push the version number using `git push --tags`
6. Run `npm run deploy:hustle`
7. Run `npm run deploy:demo`

**Remember:** Pull Requests will be approved **only** if have their changes listed on `CHANGELOG.md` file.