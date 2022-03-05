export class Exception extends Error {
  public status: number;
  public message: string;
  public stack: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.stack = new Error().stack;
  }
  send() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
