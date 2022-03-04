import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertMessageService } from '@Components/components/alert-message/alert-message.service';
import {
  FuseConfirmationConfig,
  FuseConfirmationService,
} from '@Components/services/confirmation';
import { SearchPaginationParams } from 'app/models/SearchPaginationParams';
import { ExpenseAddComponent } from 'app/screens/Finance/Expense/add/Expense-add.component';
import { ExpenseScreenService } from 'app/screens/Finance/Expense/Expense-screen.service';

@Component({
  selector: 'app-Expense-screen',
  templateUrl: './Expense-screen.component.html',
  styleUrls: ['./Expense-screen.component.scss'],
})
export class ExpenseScreenComponent implements OnInit {
  table$: any[] = [];
  isLoading: boolean = true;
  pagination: SearchPaginationParams = new SearchPaginationParams();
  constructor(
    private _matDialog: MatDialog,
    private _confirmationService: FuseConfirmationService,
    private _service: ExpenseScreenService,
    private _alertMessageService: AlertMessageService
  ) {}

  ngOnInit(): void {
    this.getExpenseList();
  }
  search(q: any): void {
    this.pagination.name = q.value;
    this.getExpenseList();
  }
  paginationChange(event: any): void {
    this.pagination.pageNumber = event.pageIndex;
    this.pagination.batchSize = event.pageSize;
    this.getExpenseList();
    console.log(event);
  }
  getExpenseList(): void {
    this.isLoading = false;
    this._service.searchExpenses(this.pagination).subscribe(
      (data: any) => {
        this.table$ = data.data;
        this.pagination.total = data.totalItems;
        console.log('data', data);
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.log('error', error);
      }
    );
  }
  /**
   * Open compose dialog
   */
  openComposeDialog(): void {
    // Open the dialog
    const dialogRef = this._matDialog.open(ExpenseAddComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getExpenseList();
    });
  }
  openEditDialog(data: any): void {
    // Open the dialog
    const dialogRef = this._matDialog.open(ExpenseAddComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getExpenseList();
    });
  }
  openDeleteDialog(id: number): void {
    // Open the dialog
    let congif: FuseConfirmationConfig = {
      title: 'Remove Expeanse',
      message:
        'Are you sure you want to remove this Expeanse permanently? <span class="font-medium">This action cannot be undone!</span>',
      icon: {
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn',
      },
      actions: {
        confirm: {
          show: true,
          label: 'Remove',
          color: 'warn',
        },
        cancel: {
          show: true,
          label: 'Cancel',
        },
      },
      dismissible: true,
    };
    const dialogRef = this._confirmationService.open(congif);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('result', result);
      if (result === 'confirmed') {
        this._service.deleteExpense(id).subscribe((data) => {
          console.log(data);
          if (data) {
            this._alertMessageService.success('Expeanse Removes successfully');
            this.getExpenseList();
          }
        });
      }
    });
  }
}
