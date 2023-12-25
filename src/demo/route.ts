import { type Server } from 'bun';
import z from 'zod';

// TODO: middleware for protected and public routes
// DONE: define different routes but not using method names
// DONE: map method to routes

type Method<Input = z.Schema, Output = any> = (input: Input) => Output;

class NPDevelopmentError extends Error {
  constructor() {
    super();
  }
}

// 
class NP {
  router(procedures: Record<string, Procedure>) {
    console.log({procedures});
    return (request: Request, server: Server) => {
      const url = new URL(request.url);
      const procedure = procedures[url.pathname.slice(1)];
      if (!procedure) return new Response("you fucked up it's normal", {
        status: 404,
      });

      // if can't find return error "NPError: you haven't define the route for this method abc"
      const handler = procedure._handler;
      if (!handler) throw new NPDevelopmentError();

      const input = z.record(
        z.number(),
      );
   
      const output = handler(input);

      return new Response(JSON.stringify(output));
    };
  }
}

const t = new NP();

class Procedure {
  _path?: string;
  _method?: string;
  _handler?: (opts: any) => any;

  constructor(opts: {
    _path?: string;
    _method?: string;
    _handler?: (opts: any) => any;
  } = {}) {
    this._path = opts._path;
    this._method = opts._method;
    this._handler = opts._handler;
  }

  path(path: string) {
    return new Procedure({
      ...this,
      _path: path,
    });
  }

  method(method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    return new Procedure({
      ...this,
      _method: method,
    });
  }

  input(_schema: z.Schema) {
    return this;
  }

  use(_method: (opts: any) => void) {
    return this;
  }

  query(handler: (opts: any) => any) {
     // TODO: Pretty error with color on console
    if (this._method !== 'GET') throw new Error(`Queries do not support the "${this._method}" method, please use a mutation.`);
    return new Procedure({
      ...this,
      // TODO: red alert, prevent query being called after a non "GET" method call
      _method: 'GET',
      _handler: handler,
    });
  }

  mutate(handler: (opts: any) => any) {
    // TODO: Pretty error with color on console
    if (this._method === 'GET') throw new Error(`Mutations do not support the "GET" method, please use a query.`);
    return new Procedure({
      ...this,
      // TODO: throw red squiggle at mutate if the method is "GET"
      _method: this._method ?? "POST",
      _handler: handler,
    });
  }
}

class TRPCError {
  constructor(options: {
    code: string;
    message: string;
  }) {}
}

const publicProcedure = new Procedure();

export const authorizedProcedure = publicProcedure
  .input(z.object({ townName: z.string() }))
  .use((opts) => {
    if (opts.input.townName !== 'Pucklechurch') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: "We don't take kindly to out-of-town folk",
      });
    }
 
    return opts.next();
  });
 
  // /app/hello
export const appRouter = t.router({
    // TODO: help users define their own headers
  getUsers: authorizedProcedure
    .path("/user/:id")
    .method("GET")
    .query(() => {
      return {
        message: 'hello world',
      };
    }),

  deleteUser: authorizedProcedure
    .path("/asdsad/:id")
    .method('DELETE')
    .mutate(() => {
      return {
        message: 'hello world',
      };
    }),

  // createUser: authorizedProcedure
  //   .endpoint("/user/:id")
  //   .mutate(() => {
  //     return {
  //       message: 'hello world',
  //     };
  //   }),
  
  // goodbye: authorizedProcedure.mutate(async (opts) => {
  //   await opts.ctx.signGuestBook();
 
  //   return {
  //     message: 'goodbye!',
  //   };
  // }),
});