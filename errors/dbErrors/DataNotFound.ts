import DataBaseError from "./DataBaseError";

export default class DataNotFound extends DataBaseError {
  constructor(message: string) {
    super(message);
    this.name = "DataNotFound";
  }
}