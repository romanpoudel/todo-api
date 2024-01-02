import BaseError from "./baseError";

export default class permissionDenied extends BaseError {
  statusCode: number;
    constructor(message="Permission Denied") {
        super(message);
        this.statusCode = 403;
    }
}