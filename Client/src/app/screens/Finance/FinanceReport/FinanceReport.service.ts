import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchPaginationParams } from 'app/models/SearchPaginationParams';
import { environment } from 'environments/environment';
enum Api {
  getAll = 'finance',

  search = 'finance/report',
}
@Injectable({
  providedIn: 'root',
})
export class FinanceReportService {
  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}
  getAllReport() {
    return this._http.get(this.baseUrl + Api.getAll);
  }
  searchReport(data: SearchPaginationParams) {
    let params = new HttpParams();
    params = params.append('name', data.name.toString());
    params = params.append('batchSize', data.batchSize.toString());
    params = params.append('order', data.order.toString());
    params = params.append('pageNumber', data.pageNumber.toString());
    params = params.append('sortColumn', data.sortColumn.toString());
    params = params.append('type', data.type.toLowerCase());
    params = params.append('fromDate', data.fromDate.toString());
    params = params.append('toDate', data.toDate.toString());
    return this._http.get(this.baseUrl + Api.search, {
      observe: 'body',
      params,
    });
  }
}
