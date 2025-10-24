import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: "cjs",
	platform: "node",
	dts: true,
	outDir: "dist",
	clean: true,
	tsconfig: "./tsconfig.plugin.json",
});
