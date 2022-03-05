export class Exception {
  public status: number;
  public msg: string;
  public message: string;
  public stack: string;

  constructor(msg: string, status: number, error: any) {
    this.status = status;
    this.msg = msg;
    this.message = error.message;
    this.stack = error.stack;
  }
  send() {
    return {
      status: this.status,
      msg: this.msg,
      message: this.message,
      stack: this.stack,
    };
  }
}
