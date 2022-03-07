import { Component, OnInit } from '@angular/core';
import { MyBanalce } from 'app/models/MyBanalce';
import { DashboardService } from 'app/screens/dashboard/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user = {
    name: '',
  };
  myBanalce: MyBanalce = {
    Balance: {
      amount: 0,
      count: 0,
    },
    totalIncome: {
      amount: 0,
      count: 0,
    },
    totalExpense: {
      amount: 0,
      count: 0,
    },
    totalInvestment: {
      amount: 0,
      count: 0,
    },
  };
  constructor(private _service: DashboardService) {
    let user = JSON.parse(localStorage.getItem('user'));
    this.user.name = user.name;
  }
  ngOnInit(): void {
    this.getMyBalance();
  }
  getMyBalance() {
    this._service.getMyBalance().subscribe((data: MyBanalce) => {
      this.myBanalce = data;
      console.log(this.myBanalce);
    });
  }
}
