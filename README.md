# @nardole/vite-plugin-mockoon

Run Mockoon alongside your Vite dev server using a tiny plugin. It spawns the Mockoon CLI when Vite starts and stops it when Vite shuts down.

- Zero-config start with a Mockoon data file
- Works on macOS, Linux, and Windows
- Pass any extra Mockoon CLI flags you need

## Installation

npm:

- npm install -D @nardole/vite-plugin-mockoon @mockoon/cli

Yarn:

- yarn add -D @nardole/vite-plugin-mockoon @mockoon/cli

pnpm:

- pnpm add -D @nardole/vite-plugin-mockoon @mockoon/cli

Note: The plugin launches the `mockoon-cli` binary. Installing `@mockoon/cli` locally ensures the command is available on your PATH when running Vite scripts.

## Usage

vite.config.ts:

- import { defineConfig } from 'vite'
- import { mockoonPlugin } from '@nardole/vite-plugin-mockoon'
-
- export default defineConfig({
-   plugins: [
-     mockoonPlugin({
-       dataPath: './mockoon/data.json',
-       // Optional: forward any CLI flags
-       args: ['--port', '3001']
-     })
-   ]
- })

When you run `vite` or `vite dev`, the plugin will start Mockoon with the provided data file and extra flags.

## Options

- dataPath (string | string[]): Required. Path to a Mockoon data file (.json) or an array of files.
- stdio (StdioOptions): Optional. How to connect the child process stdio. Defaults to "ignore". Use "inherit" to see Mockoon logs in your terminal.
- args (string[]): Optional. Additional CLI arguments to pass to Mockoon, e.g. ["--port", "3001", "--hostname", "0.0.0.0"].
- command (string): Optional. Binary to execute. Defaults to "mockoon-cli".
- autoStart (boolean): Optional. Start automatically with the Vite dev server. Defaults to true.
- stopOnExit (boolean): Optional. Try to stop the Mockoon process when Vite exits. Defaults to true.

Notes:

- If you provide multiple data files, the plugin passes multiple `--data <file>` flags to the Mockoon CLI.
- For available flags, refer to Mockoon CLI docs: https://github.com/mockoon/mockoon/tree/main/packages/cli

## Recipes

- Show Mockoon logs in the same terminal:

- mockoonPlugin({ dataPath: './mock.json', stdio: 'inherit' })

- Run on a specific port and hostname:

- mockoonPlugin({ dataPath: './mock.json', args: ['--port', '3100', '--hostname', '127.0.0.1'] })

- Multiple environments (multiple data files):

- mockoonPlugin({ dataPath: ['./mock-1.json', './mock-2.json'] })

## Development

- pnpm i
- pnpm build

This repository uses `tsup` to build ESM output and TypeScript declarations. The plugin source is in `src/` and the built files are emitted to `dist/`.

### Release

1. Bump the version in package.json
2. Build: `npm run build`
3. Publish: `npm publish --access public`

## Contributing

Contributions are welcome! Please read CONTRIBUTING.md for local setup and guidelines.

## License

MIT © Nardole Labs
