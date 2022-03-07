import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertMessageService } from '@Components/components/alert-message/alert-message.service';
import { FuseConfirmationService } from '@Components/services/confirmation';
import { SearchPaginationParams } from 'app/models/SearchPaginationParams';
import { FinanceReportService } from 'app/screens/Finance/FinanceReport/FinanceReport.service';
import * as moment from 'moment';

@Component({
  selector: 'app-FinanceReport',
  templateUrl: './FinanceReport.component.html',
  styleUrls: ['./FinanceReport.component.scss'],
})
export class FinanceReportComponent implements OnInit {
  table$: any[] = [];
  isLoading: boolean = false;
  pagination: SearchPaginationParams = new SearchPaginationParams();
  types: any[] = ['Income', 'Expense', 'Investment'];
  Form = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });
  constructor(
    private _confirmationService: FuseConfirmationService,
    private _service: FinanceReportService,
    private _alertMessageService: AlertMessageService
  ) {}

  ngOnInit(): void {}
  search(q: any): void {
    this.pagination.name = q.value;
    this.getReport();
  }
  paginationChange(event: any): void {
    this.pagination.pageNumber = event.pageIndex;
    this.pagination.batchSize = event.pageSize;
    this.getReport();
    console.log(event);
  }
  onFilterChange(e: any) {
    console.log(this.Form.value);
  }
  onDateChange(e: any) {}
  applyFinter() {
    console.log(this.Form.value);
    this.pagination.type = this.Form.value.type;
    if (this.Form.value.fromDate)
      this.pagination.fromDate = moment(this.Form.value.fromDate).format(
        'YYYY-MM-DD'
      );
    if (this.Form.value.toDate)
      this.pagination.toDate = moment(this.Form.value.toDate).format(
        'YYYY-MM-DD'
      );
    this.getReport();
  }
  resetForm() {
    this.Form.reset();
    this.pagination.toDate = '';
    this.pagination.fromDate = '';
    this.pagination.name = '';
    this.pagination.type = 'All';
    this.pagination.pageNumber = 0;

    this.getReport();
  }
  getReport(): void {
    this.isLoading = true;
    this._service.searchReport(this.pagination).subscribe(
      (data: any) => {
        console.log('data', data);

        this.table$ = data?.data || [];
        this.pagination.total = data.totalItems;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.log('error', error);
      }
    );
  }
}
