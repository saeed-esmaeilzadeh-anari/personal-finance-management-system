import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeScreenComponent } from 'app/screens/Finance/Income/Income-screen.component';
import { ExpenseScreenComponent } from 'app/screens/Finance/Expense/Expense-screen.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseConfirmationModule } from '@Components/services/confirmation';
import { TableActionBtnModule } from '@Components/components/table-action-btn/table-action-btn.module';
import { TableLoaderModule } from '@Components/components/table-loader/table-loader.module';
import { IncomeAddComponent } from 'app/screens/Finance/Income/add/Income-add.component';
import { AlertMessageModule } from '@Components/components/alert-message/alert-message.module';
import { ExpenseAddComponent } from 'app/screens/Finance/Expense/add/Expense-add.component';
import { InvestmentAddComponent } from 'app/screens/Finance/Investments/add/Investment-add.component';
import { InvestmentsComponent } from 'app/screens/Finance/Investments/Investments.component';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FuseConfirmationModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTableModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatStepperModule,
    TableActionBtnModule,
    TableLoaderModule,
    SharedModule,
  ],
  declarations: [
    IncomeScreenComponent,
    IncomeAddComponent,
    ExpenseScreenComponent,
    ExpenseAddComponent,
    InvestmentsComponent,
    InvestmentAddComponent,
  ],
  exports: [
    IncomeScreenComponent,
    IncomeAddComponent,
    ExpenseScreenComponent,
    ExpenseAddComponent,
    InvestmentsComponent,
    InvestmentAddComponent,
  ],
})
export class FinanceModule {}
