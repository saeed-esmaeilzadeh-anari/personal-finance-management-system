import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertMessageService } from '@Components/components/alert-message/alert-message.service';
import { ExpenseScreenService } from 'app/screens/Finance/Expense/Expense-screen.service';

@Component({
  selector: 'app-Expense-add',
  templateUrl: './Expense-add.component.html',
  styleUrls: ['./Expense-add.component.scss'],
})
export class ExpenseAddComponent implements OnInit {
  Form = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    note: new FormControl(''),
    receivedFrom: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });
  message = '';
  isEdit: boolean = false;
  id: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _matDialogRef: MatDialogRef<ExpenseAddComponent>,
    private _alertMessageService: AlertMessageService,
    private _service: ExpenseScreenService
  ) {
    this._matDialogRef.disableClose = true;
  }

  ngOnInit() {
    console.log(this._data);
    if (this._data) {
      this.isEdit = this._data?.id ? true : false;
      this.id = this._data?.id || 0;
      this.Form.patchValue({
        name: this._data.name,
        isActive: this._data.isActive,
      });
    }
  }

  exit() {
    this._matDialogRef.close(false);
  }

  submit(): void {
    console.log(this.Form.value);
    if (
      isNaN(parseFloat(this.Form.value.amount)) ||
      parseFloat(this.Form.value.amount) < 0
    ) {
      this._alertMessageService.error('Invalid Amount ');
      return;
    }
    if (this.Form.valid) {
      if (!this.isEdit) {
        this._service.addExpense(this.Form.value).subscribe(
          (event: any) => {
            console.log(event);

            this._matDialogRef.close(true);
            this._alertMessageService.success('Expense Added successfully');
          },
          (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Something went wrong';
            }

            this._alertMessageService.error(this.message);
          }
        );
      } else {
        console.log(this.Form.value);
        this._service.updateExpense(this.id, this.Form.value).subscribe(
          (event: any) => {
            console.log(event);
            this._matDialogRef.close(true);
            this._alertMessageService.success('Expense Updated successfully');
          },
          (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Something went wrong';
            }
            this._alertMessageService.error(this.message);
          }
        );
      }
    } else {
      this._alertMessageService.error('Please fill all the fields');
    }
  }
}
