export class HttpError extends Error {
  httpCode: number;
  errorMessage: string;

  constructor(httpCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
    this.httpCode = httpCode;
    this.errorMessage = message;
    this.stack = new Error().stack;
  }
}
