# Contributing to @nardole/vite-plugin-mockoon

Thanks for your interest in contributing!

## Development setup

- Clone the repo
- Install dependencies with your favorite package manager (npm, yarn, pnpm)
- Build once: `npm run build`

Source code lives in `src/` and is built to `dist/` using `tsup`.

## Commit style

Use clear, conventional-style commit messages when possible (e.g., feat:, fix:, docs:). This helps during releases and change logs.

## Testing locally

You can test the plugin in another local Vite project by using `npm link` or `yarn link`, or by referencing the local path in that project's package.json.

Since the plugin spawns the Mockoon CLI, ensure `@mockoon/cli` is installed in the consuming project (devDependency).

## Pull requests

- Fork the repo and create a feature branch
- Keep your changes focused and minimal
- Update README if the public API or behavior changes
- Describe what and why in the PR

## Releasing (maintainers)

1. Update version in package.json (follow semver)
2. `yarn build`
3. `npm publish --access public`

## Code of Conduct

Be respectful and inclusive. Help maintain a welcoming environment for everyone.
