import { HttpError } from './http-error';

export class TRPCError extends HttpError {
  constructor({ message, code }: { message: string; code: string }) {
    super(message, Number(code));
  }
}
