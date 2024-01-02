class BaseError extends Error {
  constructor(message = "Error occurred") {
    super(message);

    this.message = message;
  }
}

export default BaseError;