/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExpenseScreenService } from './Expense-screen.service';

describe('Service: ExpenseScreen', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseScreenService]
    });
  });

  it('should ...', inject([ExpenseScreenService], (service: ExpenseScreenService) => {
    expect(service).toBeTruthy();
  }));
});
