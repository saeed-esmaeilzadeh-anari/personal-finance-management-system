import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface AlertMessage {
  type?: "success" | "error" | string;
  message?: string;
  close?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  AlertMsg: BehaviorSubject<AlertMessage> = new BehaviorSubject({});

  constructor() { }

  success(message: string = "Successfully saved!") {
    let data = { type: "success", message: message, close: false };
    this.AlertMsg.next(data);
  }
  error(message: string = "Error!") {
    let data = { type: "error", message: message, close: false };

    this.AlertMsg.next(data);
  }
  closeMsg() {
    this.AlertMsg.next({ type: "success", message: '', close: true });
  }

}
