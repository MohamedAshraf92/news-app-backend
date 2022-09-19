export default class CustomError extends Error {
  constructor(status = 500, name = "ERROR", message = "Internal server error") {
    super();
    this.status = status;
    this.name = name;
    this.message = message;
  }
}
