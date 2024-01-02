import BaseError from "./baseError";

export default class notFoundError extends BaseError {
  statusCode: number;
  constructor(message="Not Found") {
    super(message);
    this.statusCode = 404;
  }
}
