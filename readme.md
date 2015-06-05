TypeStrong Compiler
===================

This is a prototype for a promise-based TypeScript compiler (tsc) adapter.

The goal is for this module to eventually be used by grunt-ts and any other future TypeStrong task runner plugins.

Setup
-----
Run `npm install` and `tsd reinstall -so`.

Build
-----
Run `npm run build`.  If successful, the build command should take just a moment and will return no output.

Test
----
Run `npm run test`.  This will run the nodeunit tests.

Debug
-----

If you have node-inspector installed, you can debug all tests with this command:

`node-debug --debug-brk ./node_modules/nodeunit/bin/nodeunit tests/tests.js`

To debug a specific test, use this command (for example):

`node-debug --debug-brk ./node_modules/nodeunit/bin/nodeunit tests/tests.js -t can_set_custom_compiler`
