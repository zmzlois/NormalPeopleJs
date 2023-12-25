import { type Server } from 'bun';
import z from 'zod';
import { Procedure } from './procedure';
import { NPError } from './errors/np-error';
import { HttpError } from './errors/http-error';

export class NP {
  router(procedures: Record<string, Procedure>) {
    return async (request: Request, server: Server) => {
      const url = new URL(request.url);

      try {
        // Find the associated procedure
        const procedure = procedures[url.pathname.slice(1)];

        // If the procedure doesn't exist, return a 404
        if (!procedure) {
          return new Response(`You fucked up it's normal.`, {
            status: 404,
          });
        }

        // If the procedure is missing it's handler throw
        const handler = procedure._handler;
        if (!handler) throw new NPError(`You didn't define the handler for this route.`);

        // Get the input data
        const data =
          request.method === 'GET'
            ? Object.fromEntries(url.searchParams.entries())
            : ((await request.json()) as Record<string, unknown>);

        // Validate input
        const input = procedure._input ?? z.null();
        const output = input.safeParse(data);

        // Throw error if input fails validation
        if (!output.success) throw new Error(output.error.message);

        // Generate output based on input
        const response = handler(input);

        // Convert response to a valid output for bun
        return new Response(JSON.stringify(response));
      } catch (error: unknown) {
        // If a non-error is throw (e.g. a number) return a clean error instance
        if (!(error instanceof Error)) {
          return new Response('Unknown Error', {
            status: 500,
          });
        }

        // Return the error
        return new Response(`Error: ${error.message}`, {
          status: error instanceof HttpError ? error.code : 500,
        });
      }
    };
  }
}
