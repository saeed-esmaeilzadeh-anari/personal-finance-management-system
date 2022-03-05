import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '@Components/components/alert-message/alert-message.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit {
  visiable = false;
  type: 'success' | 'error' | string = 'error';
  message: string = '';
  timeout: any = null;
  msgArr: any[] = [];
  constructor(private _alertMessageService: AlertMessageService) {
    this._alertMessageService.AlertMsg.subscribe((message) => {
      if (message.type === 'success') {
        this.success(message.message);
      } else if (message.type === 'error') {
        this.error(message.message);
      }
    });
  }

  ngOnInit() {}

  success(message: string = 'Successfully saved!') {
    // if (this.timeout) {
    //   clearTimeout(this.timeout);
    // }
    this.visiable = true;
    this.type = 'success';
    this.message = message;
    this.msgArr.push({ message: message, type: 'success' });
    this.timeout = setTimeout(() => {
      this.visiable = false;
      this.msgArr.shift();
    }, 5000);
  }
  error(message: string = 'Error!') {
    // if (this.timeout) {
    //   clearTimeout(this.timeout);
    // }
    this.visiable = true;
    this.type = 'error';
    this.message = message;
    // if msgArr have same message, don't push
    if (this.msgArr.findIndex((item) => item.message === message) === -1) {
      this.msgArr.push({ message: message, type: 'error' });
      this.timeout = setTimeout(() => {
        this.visiable = false;
        this.msgArr.shift();
      }, 5000);
    }
  }
  close() {
    this.visiable = false;
    this.msgArr.shift();
  }
}
