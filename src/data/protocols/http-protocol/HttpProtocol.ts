export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}
export type HttpMethod = "GET";

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
};
export type HttpResponse = {
  statusCode: number;
  body?: unknown;
};

export interface HttpProtocol {
  request: (data: HttpRequest) => Promise<HttpResponse>;
}
