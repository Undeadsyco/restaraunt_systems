export default class DataBaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataBaseError";
  }
}