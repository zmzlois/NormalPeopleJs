### We had a look at recent frameworks' dependencies and their implementation
1. trpc 
2. Elysia
3. Fastify 
4. Nestjs
5. [Connect](https://github.com/senchalabs/connect)
6. [pillarjs](https://github.com/pillarjs) bits and pieces to build your own web framework

Question: 
1. is a BFF necessary for frontend? is it for the concern of "don't write backend code in frontend to fetch data"?
2. if frontend - BFF - backend/server is a good way of doing it, do we include BFF or strip BFF off but make it standalone backend? (a question after seeing isomorphic-fetch)

The original connect 

```javascript
var connect = require('connect');
var http = require('http');

var app = connect();

// gzip/deflate outgoing responses
// Import or write our own + a lot of time you don't need to do compression
// better for the reverse proxy to do compression 
// bun or node might serve the full response, once the response go out
// in public it should do it
// you want your server "just serving the request"
var compression = require('compression');
app.use(compression());

// store session state in browser cookie
// small util with no type support, should revise/rewrite
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

// parse urlencoded request bodies into req.body
// bun built in, yeet it + support superjson, node doesn't support superjson but it is bun support
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// respond to all requests
app.use(function(req, res){
  res.end('Hello from Connect!\n');
});

//create node.js http server and listen on port
http.createServer(app).listen(3000);
```

Migrate from trpc 

```typescript 
npx migrate np
```
We use [jscodeshift](https://github.com/facebook/jscodeshift), revised based on [next/codemod](https://nextjs.org/docs/app/building-your-application/upgrading/codemods)

Another example taken from Fastify rewrite express
[avvio](https://www.npmjs.com/package/avvio) zero typescript support and inference
```javascript 
'use strict'

const app = require('avvio')()

app
  .use(first, { hello: 'world' })
  .after((err, cb) => {
    console.log('after first and second')
    cb()
  })

app.use(third)

app.ready(function (err) {
  // the error must be handled somehow
  if (err) {
    throw err
  }
  console.log('application booted!')
})

function first (instance, opts, cb) {
  console.log('first loaded', opts)
  instance.use(second)
  cb()
}

function second (instance, opts, cb) {
  console.log('second loaded')
  process.nextTick(cb)
}

// async/await or Promise support
async function third (instance, opts) {
  console.log('third loaded')
}
```