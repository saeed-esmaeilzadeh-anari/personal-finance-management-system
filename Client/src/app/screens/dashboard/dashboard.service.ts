import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyBanalce } from 'app/models/MyBanalce';
import { environment } from 'environments/environment';
enum Api {
  mybalance = 'mybalance',
}
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  getMyBalance() {
    return this._http.get<MyBanalce>(`${this.baseUrl}/${Api.mybalance}`);
  }
}
