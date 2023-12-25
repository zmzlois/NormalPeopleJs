import { appRouter } from './route';
const port = Number(process.env.PORT ?? '0');

const server = Bun.serve({
  port,
  fetch: appRouter,
});

console.info('Started web server at http://localhost:%s', server.port);
