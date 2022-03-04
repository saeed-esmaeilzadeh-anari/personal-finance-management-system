import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertMessageService } from '@Components/components/alert-message/alert-message.service';
import {
  FuseConfirmationConfig,
  FuseConfirmationService,
} from '@Components/services/confirmation';
import { SearchPaginationParams } from 'app/models/SearchPaginationParams';
import { InvestmentAddComponent } from 'app/screens/Finance/Investments/add/Investment-add.component';
import { InvestmentsService } from 'app/screens/Finance/Investments/Investments.service';

@Component({
  selector: 'app-Investments',
  templateUrl: './Investments.component.html',
  styleUrls: ['./Investments.component.scss'],
})
export class InvestmentsComponent implements OnInit {
  table$: any[] = [];
  isLoading: boolean = true;
  pagination: SearchPaginationParams = new SearchPaginationParams();
  constructor(
    private _matDialog: MatDialog,
    private _confirmationService: FuseConfirmationService,
    private _service: InvestmentsService,
    private _alertMessageService: AlertMessageService
  ) {}

  ngOnInit(): void {
    this.getIncestmentsList();
  }
  search(q: any): void {
    this.pagination.name = q.value;
    this.getIncestmentsList();
  }
  paginationChange(event: any): void {
    this.pagination.pageNumber = event.pageIndex;
    this.pagination.batchSize = event.pageSize;
    this.getIncestmentsList();
    console.log(event);
  }
  getIncestmentsList(): void {
    this.isLoading = false;
    this._service.searchInvestments(this.pagination).subscribe(
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
    const dialogRef = this._matDialog.open(InvestmentAddComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getIncestmentsList();
    });
  }
  openEditDialog(data: any): void {
    // Open the dialog
    const dialogRef = this._matDialog.open(InvestmentAddComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getIncestmentsList();
    });
  }
  openDeleteDialog(id: number): void {
    // Open the dialog
    let congif: FuseConfirmationConfig = {
      title: 'Remove Investment',
      message:
        'Are you sure you want to remove this Investment permanently? <span class="font-medium">This action cannot be undone!</span>',
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
        this._service.deleteInvestment(id).subscribe((data) => {
          console.log(data);
          if (data) {
            this._alertMessageService.success(
              'Investment Deleted successfully'
            );
            this.getIncestmentsList();
          }
        });
      }
    });
  }
}
