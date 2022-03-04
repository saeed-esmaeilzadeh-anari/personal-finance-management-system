import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FuseConfirmationConfig,
  FuseConfirmationService,
} from '@Components/services/confirmation';
import { SearchPaginationParams } from 'app/models/SearchPaginationParams';
import { IncomeScreenService } from 'app/screens/Finance/Income/Income-screen.service';

@Component({
  selector: 'app-Income-screen',
  templateUrl: './Income-screen.component.html',
  styleUrls: ['./Income-screen.component.scss'],
})
export class IncomeScreenComponent implements OnInit {
  table$: any[] = [];
  isLoading: boolean = true;
  pagination: SearchPaginationParams = new SearchPaginationParams();
  constructor(
    private _matDialog: MatDialog,
    private _confirmationService: FuseConfirmationService,
    private _service: IncomeScreenService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }
  search(q: any): void {
    this.pagination.name = q.value;
    this.getBrands();
  }
  paginationChange(event: any): void {
    this.pagination.pageNumber = event.pageIndex;
    this.pagination.batchSize = event.pageSize;
    this.getBrands();
    console.log(event);
  }
  getBrands(): void {
    this.isLoading = false;
    this._service.searchIncomes(this.pagination).subscribe(
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
    // const dialogRef = this._matDialog.open(BrandAddComponent);
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) this.getBrands();
    // });
  }
  openEditDialog(data: any): void {
    // Open the dialog
    // const dialogRef = this._matDialog.open(BrandAddComponent, {
    //   data: data,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) this.getBrands();
    // });
  }
  openDeleteDialog(id: number): void {
    // Open the dialog
    let congif: FuseConfirmationConfig = {
      title: 'Remove Brand',
      message:
        'Are you sure you want to remove this Brand permanently? <span class="font-medium">This action cannot be undone!</span>',
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
        this._service.deleteIncome(id).subscribe((data) => {
          console.log(data);
          if (data) {
            // this._alertMessageService.success('Brand Deleted successfully');
            this.getBrands();
          }
        });
      }
    });
  }
}
