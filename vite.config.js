import { defineConfig } from "vite";

// using defineConfig gives you intellisense:-)
export default defineConfig((env) => {
    const isDev = env.mode === "development";
    const isProd = env.mode === "production";
    const isBranch = process.env.npm_config_branch === "true";

    const withDebugger = isDev && process.env.npm_config_nodebug !== "true";
    const optimize = isProd && !isBranch;
    const minify = isProd;
    const cssMinify = isProd;

    return {
        plugins: [],
        build: {
            outDir: "dist",
            emptyOutDir: true,
            lib: {
                entry: "src/emoji-picker.ts",
                // formats: ["iife"],
                name: "emoji-picker.js",
            },
            rollupOptions: {
                output: {
                    format: "iife",
                    entryFileNames: "[name].js",
                },
            },
            // defaults to false when building lib
            // we want this to be true so no css files are extracted / generated
            cssCodeSplit: true,
            minify,
            cssMinify,
        },
        server: {
            host: "localhost",
            port: 3100,
            cors: true,
            open: "index.html",
        },
    };
});
