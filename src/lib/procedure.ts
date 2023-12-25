import z from 'zod';

export class Procedure {
  _path?: string;
  _method?: string;
  _handler?: (opts: any) => any;

  constructor(
    opts: {
      _path?: string;
      _method?: string;
      _handler?: (opts: any) => any;
    } = {},
  ) {
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
    if (this._method !== 'GET')
      throw new Error(`Queries do not support the "${this._method}" method, please use a mutation.`);
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
      _method: this._method ?? 'POST',
      _handler: handler,
    });
  }
}
