import BaseError from "./baseError";

export default class validationError extends BaseError {
  statusCode: number;
    constructor(message= "validationError") {
        super(message);
        this.statusCode = 400;
    }
}