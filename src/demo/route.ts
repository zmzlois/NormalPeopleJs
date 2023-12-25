import { type Server } from 'bun';
import z from 'zod';

type Method<Input = z.Schema, Output = any> = (input: Input) => Output;

// 
class NP {
  router(procedures: Record<string, Method>) {
    console.log({procedures});
    return (request: Request, server: Server) => {
      const url = new URL(request.url);
      const route = procedures[url.pathname.slice(1)];
      if (!route) return new Response("you fucked up it's normal", {
        status: 404,
      });
      const input = z.record(
        z.number(),
      );

      const output = route(input);

      return new Response(JSON.stringify(output));
    };
  }
}

const t = new NP();

class Procedure {
  endpoint(path: string) {
    return this;
  }

  method(_method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    return this;
  }

  input(_schema: z.Schema) {
    return this;
  }

  use(_method: (opts: any) => void) {
    return this;
  }

  query(method: (opts: any) => any) {
    return method;
  }

  mutate(_method: (opts: any) => any) {}
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
  getUsers: authorizedProcedure
    .endpoint("/user/:id")
    .query(() => {
      return {
        message: 'hello world',
      };
    }),

  // deleteUser: authorizedProcedure
  //   .endpoint("/user/:id")
  //   .method('GET')
  //   .mutate(() => {
  //     return {
  //       message: 'hello world',
  //     };
  //   }),

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