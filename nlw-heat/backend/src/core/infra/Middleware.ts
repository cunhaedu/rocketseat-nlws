import { HttpResponse } from './HttpResponse';

export interface IMiddleware<T = any, U = any> {
  handle: (httpRequest: T, httpBody?: U) => Promise<HttpResponse | false>;
}
