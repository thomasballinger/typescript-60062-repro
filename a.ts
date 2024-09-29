// just by importing this package...
//
// This package is weird (it's broken, see packages/b/dist/esm/package.json
// which should say "type": "module")
import { foo as fooB } from "@ballingt-tmp/b";
const b: "commonjs" = fooB;
// Try commenting out the above two lines restarting the TS server

// ...the resolution of this package changes
//
// This package is configured correctly, but just having @ballingt-tmp/b imported
// breaks it's types.
import { foo as fooC } from "@ballingt-tmp/c";
const c: "esm" = fooC;

// See traceResolution for full log, here's the interesting bit where a lookup used a bad cached value:
/*
======== Resolving module '@ballingt-tmp/d' from '/Users/tomb/typescript-repro/node_modules/@ballingt-tmp/c/dist/esm/index.d.ts'. ========
Explicitly specified module resolution kind: 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/Users/tomb/typescript-repro/node_modules/@ballingt-tmp/c/dist/esm/package.json' exists according to earlier cached lookups.
Loading module '@ballingt-tmp/d' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/Users/tomb/typescript-repro/node_modules/@ballingt-tmp/c/dist/esm/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'ballingt-tmp__d'
Directory '/Users/tomb/typescript-repro/node_modules/@ballingt-tmp/c/dist/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'ballingt-tmp__d'
Directory '/Users/tomb/typescript-repro/node_modules/@ballingt-tmp/c/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'ballingt-tmp__d'
Resolution for module '@ballingt-tmp/d' was found in cache from location '/Users/tomb/typescript-repro/node_modules/@ballingt-tmp'.
======== Module name '@ballingt-tmp/d' was successfully resolved to '/Users/tomb/typescript-repro/node_modules/@ballingt-tmp/d/dist/commonjs/index.d.ts' with Package ID '@ballingt-tmp/d/dist/commonjs/index.d.ts@0.0.2'. ========
*/
