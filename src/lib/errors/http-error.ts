import { NPError } from './np-error';

export class HttpError extends NPError {
  constructor(message: string, public readonly code: number) {
    super(message);
  }
}
