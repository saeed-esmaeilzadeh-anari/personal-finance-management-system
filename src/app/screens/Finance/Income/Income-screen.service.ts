import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { SearchPaginationParams } from 'app/models/SearchPaginationParams';
enum Api {
  getIncomes = 'income',
  getIncome = 'income/',
  addIncome = 'income',
  updateIncome = 'income/',
  deleteIncome = 'income/',
  searchIncomes = 'searchIncomes',
}
@Injectable({
  providedIn: 'root',
})
export class IncomeScreenService {
  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  getIncomes() {
    return this._http.get(this.baseUrl + Api.getIncomes);
  }

  getIncome(id: number) {
    return this._http.get(this.baseUrl + Api.getIncome + id);
  }

  addIncome(data: any) {
    return this._http.post(this.baseUrl + Api.addIncome, data);
  }

  updateIncome(id: number, data: any) {
    return this._http.put(this.baseUrl + Api.updateIncome + id, data);
  }

  deleteIncome(id: number) {
    return this._http.delete(this.baseUrl + Api.deleteIncome + id);
  }

  searchIncomes(data: SearchPaginationParams) {
    let params = new HttpParams();
    params = params.append('name', data.name.toString());
    params = params.append('batchSize', data.batchSize.toString());
    params = params.append('order', data.order.toString());
    params = params.append('order', data.order.toString());
    params = params.append('pageNumber', data.pageNumber.toString());
    params = params.append('sortColumn', data.sortColumn.toString());

    return this._http.post(this.baseUrl + Api.searchIncomes, {
      observe: 'body',
      params,
    });
  }
}
