import type { Plugin, ViteDevServer } from "vite";
import { spawn } from "child_process";
import path from "node:path";
import { ChildProcess, type StdioOptions } from "node:child_process";

export interface MockoonPluginOptions {
	/** Path to a Mockoon data file (.json) or an array of files */
	dataPath: string | string[];
	/** stdio option passed to child_process.spawn (default: "ignore") */
	stdio?: StdioOptions;
	/** Additional CLI args to pass to mockoon-cli, e.g. ["--port", "3001"] */
	args?: string[];
	/** Command to run (default: "mockoon-cli") */
	command?: string;
	/** Auto start when Vite dev server starts (default: true) */
	autoStart?: boolean;
	/** Kill the Mockoon process on Vite exit (default: true) */
	stopOnExit?: boolean;
}

export function mockoonPlugin(options: MockoonPluginOptions): Plugin {
	let mockoonProcess: ChildProcess | null = null;

	function buildDataArgs(dataPath: string | string[]): string[] {
		if (Array.isArray(dataPath)) {
			return dataPath.flatMap((p) => ["--data", path.resolve(p)]);
		}
		return ["--data", path.resolve(dataPath)];
	}

	function stopProcess(signal?: NodeJS.Signals | number) {
		if (mockoonProcess && !mockoonProcess.killed) {
			console.log("[mockoon] Stopping Mockoon CLI...");
			try {
				mockoonProcess.kill(signal as any);
			} catch (e) {
				// noop
			}
			mockoonProcess = null;
		}
	}

	return {
		name: "vite-plugin-nardole-mockoon",
		apply: "serve",
		configureServer(server?: ViteDevServer) {
			const {
				dataPath,
				stdio = ["ignore", "ignore", "inherit"],
				args = [],
				command = "mockoon-cli",
				autoStart = true,
				stopOnExit = true,
			} = options;

			if (!autoStart) {
				console.log("[mockoon] autoStart is false; not starting Mockoon CLI.");
				return;
			}

			if (mockoonProcess) {
				console.warn("[mockoon] Process already running; skipping start.");
				return;
			}

			const cliArgs = ["start", ...buildDataArgs(dataPath), ...args];

			console.log(
				"[mockoon] Starting Mockoon CLI...",
				command,
				cliArgs.join(" ")
			);

			mockoonProcess = spawn(command, cliArgs, {
				stdio,
				shell: process.platform === "win32", // ensure command resolution on Windows
			});

			mockoonProcess.on("error", (err) => {
				console.error("[mockoon] Failed to start Mockoon CLI:", err);
			});

			mockoonProcess.on("exit", (code, signal) => {
				console.log(
					`{mockoon} process exited with code ${code} signal ${String(signal)}`
				);
				mockoonProcess = null;
			});

			const cleanup = () => stopProcess();

			if (stopOnExit) {
				process.on("SIGINT", cleanup);
				process.on("SIGTERM", cleanup);
				process.on("exit", cleanup as any);
			}

			if (server) {
				server.httpServer?.once("close", cleanup);
			}
		},
	};
}
