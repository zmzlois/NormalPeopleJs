## Some notes on dependencies consideration (TBC discussion)
Mostly related to whether or how to improve performance and should we rewrite them ourselves etc

### HTTP/Fetch
- [find-my-way](https://www.npmjs.com/package/find-my-way) what Fastify or Restify uses
- [light-my-request](https://www.npmjs.com/package/light-my-request) Injects a fake HTTP request/response into a node HTTP server for simulating server logic, writing tests, or debugging. Does not use a socket connection so can be run against an inactive server (server not in listen mode).
- [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch) related [stackoverflow](https://stackoverflow.com/questions/37936715/what-is-the-difference-between-isomorphic-fetch-and-fetch#:~:text=FETCH%20is%20polyfill%20for%20browsers,on%20top%20of%20fetch%20polyfill.)

### Data processing
- [@web3-storage/multipart-parser](https://www.npmjs.com/package/@web3-storage/multipart-parser) sending data chunks by chunks
- [supserjson](https://www.npmjs.com/package/superjson) also related [next-superjson-plugin](https://www.npmjs.com/package/next-superjson-plugin)

### Build + bundle related
- [unbuild](https://www.npmjs.com/package/unbuild)
- [unplugin](https://www.npmjs.com/package/unplugin) unified plugin system for build tools


### Running migration 
Revised based on [next/codemod](https://www.npmjs.com/package/@next/codemod) and the archived facebook [codemod](https://github.com/facebookarchive/codemod)
- [jscodeshift](https://www.npmjs.com/package/jscodeshift) replacing codemod
- [globby](https://www.npmjs.com/package/globby) read file util
- [execa](https://www.npmjs.com/package/execa?activeTab=readme#scripts-interface) process execution (improve [child_process](https://nodejs.org/api/child_process.html) method)



### CLI/Terminal related
- [meow](https://www.npmjs.com/package/meow) for cli helper
- [picocolors](https://www.npmjs.com/package/picocolors) for pretty terminal output
- [is-git-clean](https://www.npmjs.com/package/is-git-clean) find out if a git directory is clean or not, not sure if we need this
- [inquirer](https://www.npmjs.com/package/inquirer) A collection of common interactive command line user interfaces -- asking question about normal people in terminal?
- [zx](https://www.npmjs.com/package/zx) 
- [webpod](https://webpod.dev/docs/getting-started) cli in any cloud for app deploy + version rollback? deploy an app at anywhere gives you ssh to avoid vercel
- [kleur](https://www.npmjs.com/package/kleur) colorful terminal output
- [pino](https://getpino.io/#/) high performing logging library before others exists

### Testing

- [c8 - native V8 code-coverage](https://www.npmjs.com/package/c8?activeTab=readme) don't think we need this but as reference of why
- [vitest]()