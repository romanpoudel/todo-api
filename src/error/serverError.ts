import BaseError from "./baseError";

export default class ServerError extends BaseError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 500;
  }
}