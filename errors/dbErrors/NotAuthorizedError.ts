import { DataBaseError } from "..";

export default class NotAuthorizedError extends DataBaseError {
  constructor(message: string) {
    super(message);
    this.name = "NotAuthorizedError";
  }
}