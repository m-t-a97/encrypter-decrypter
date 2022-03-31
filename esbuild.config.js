require("esbuild")
  .build({
    entryPoints: ["./src/app.ts"],
    entryNames: "bundle",
    outbase: "src",
    outdir: "./dist",
    platform: "node",
    target: "es6",
    bundle: true,
    minify: true,
  })
  .catch(() => process.exit(1));
