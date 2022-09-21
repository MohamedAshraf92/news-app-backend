export default class CustomError extends Error {
  constructor(
    statusCode = 500,
    name = "ERROR",
    message = "Internal server error"
  ) {
    super();
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
  }
}
