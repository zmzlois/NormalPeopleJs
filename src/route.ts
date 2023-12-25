import z from 'zod';
import { Procedure } from './lib/procedure';
import { NP } from './lib/normal-people';
import { TRPCError } from './lib/errors/trpc';

const publicProcedure = new Procedure();

// TODO: middleware for protected and public routes
// DONE: define different routes but not using method names
// DONE: map method to routes

const t = new NP();

export const authorizedProcedure = publicProcedure.input(z.object({ townName: z.string() })).use((opts) => {
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
    .path('/user/:id')
    .method('GET')
    .query(() => {
      return {
        message: 'hello world',
      };
    }),

  deleteUser: authorizedProcedure
    .path('/asdsad/:id')
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
