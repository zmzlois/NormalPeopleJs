import z from 'zod';

export class Procedure {
  _path?: string;
  _method?: string;
  _input?: z.Schema;
  _handler?: (opts: any) => any;

  constructor(
    opts: {
      _path?: string;
      _method?: string;
      _input?: z.Schema;
      _handler?: (opts: any) => any;
    } = {},
  ) {
    this._path = opts._path;
    this._method = opts._method;
    this._input = opts._input;
    this._handler = opts._handler;
  }

  /**
   * The path of the procedure (e.g. /user/:id)
   * @param path
   */
  path(path: string) {
    return new Procedure({
      ...this,
      _path: path,
    });
  }

  /**
   * The HTTP method of the procedure (e.g. GET)
   * @param method
   * @returns
   */
  method(method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    return new Procedure({
      ...this,
      _method: method,
    });
  }

  /**
   * The input schema of the procedure (e.g. z.object({ name: z.string() }))
   * @param _schema
   * @returns
   */
  input(schema: z.Schema) {
    return new Procedure({
      ...this,
      _input: schema,
    });
  }

  use(_method: (opts: any) => void) {
    return this;
  }

  query(handler: (opts: any) => any) {
    // TODO: Pretty error with color on console
    if (this._method !== 'GET') {
      throw new Error(`Queries do not support the "${this._method}" method, please use a mutation.`);
    }
    return new Procedure({
      ...this,
      // TODO: red alert, prevent query being called after a non "GET" method call
      _method: 'GET',
      _handler: handler,
    });
  }

  mutate(handler: (opts: any) => any) {
    // TODO: Pretty error with color on console
    if (this._method === 'GET') {
      throw new Error(`Mutations do not support the "GET" method, please use a query.`);
    }
    return new Procedure({
      ...this,
      // TODO: throw red squiggle at mutate if the method is "GET"
      _method: this._method ?? 'POST',
      _handler: handler,
    });
  }
}
