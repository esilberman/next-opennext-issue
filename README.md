# next-opennext-issue

from the root:

bun reinstall

cd frontend

bun reinstall

bun build - everything is fine

bun deploy - error

Error: Turbopack build failed with 1 errors: ./app Error: Next.js inferred your
workspace root, but it may not be correct. We couldn't find the Next.js package
(next/package.json) from the project directory:
/Users/eve/Documents/GitHub/next-opennext-issue/frontend/app To fix this, set
turbopack.root in your Next.js config, or ensure the Next.js package is
resolvable from this directory. Note: For security and performance reasons,
files outside of the project directory will not be compiled. See
https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory
for more information.

    at ignore-listed frames

error: script "build" exited with code 1 node:internal/errors:983 const err =
new Error(message); ^

Error: Command failed: bun run build at genericNodeError
(node:internal/errors:983:15) at wrappedFn (node:internal/errors:537:14) at
checkExecSyncError (node:child_process:882:11) at Object.execSync
(node:child_process:954:15) at buildNextjsApp
(file:///Users/eve/Documents/GitHub/next-opennext-issue/node_modules/@opennextjs/aws/dist/build/buildNextApp.js:15:8)
at build
(file:///Users/eve/Documents/GitHub/next-opennext-issue/node_modules/@opennextjs/cloudflare/dist/cli/build/build.js:50:9)
at async buildCommand
(file:///Users/eve/Documents/GitHub/next-opennext-issue/node_modules/@opennextjs/cloudflare/dist/cli/commands/build.js:33:5)
{ status: 1, signal: null, output: [ null, null, null ], pid: 20187, stdout:
null, stderr: null }
