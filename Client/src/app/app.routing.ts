import { Routes } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { DashboardComponent } from 'app/screens/dashboard/dashboard.component';
import { ExpenseScreenComponent } from 'app/screens/Finance/Expense/Expense-screen.component';
import { FinanceReportComponent } from 'app/screens/Finance/FinanceReport/FinanceReport.component';
import { IncomeScreenComponent } from 'app/screens/Finance/Income/Income-screen.component';
import { InvestmentsComponent } from 'app/screens/Finance/Investments/Investments.component';
// import { LayoutComponent } from 'app/layout/layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'income',
        component: IncomeScreenComponent,
      },
      {
        path: 'expense',
        component: ExpenseScreenComponent,
      },
      {
        path: 'investment',
        component: InvestmentsComponent,
      },
      {
        path: 'report',
        component: FinanceReportComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: LayoutComponent,
    canActivate: [NoAuthGuard],

    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('app/auth/sign-in/sign-in.module').then(
            (m) => m.AuthSignInModule
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('app/auth/sign-up/sign-up.module').then(
            (m) => m.AuthSignUpModule
          ),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('app/auth/forgot-password/forgot-password.module').then(
            (m) => m.AuthForgotPasswordModule
          ),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('app/auth/reset-password/reset-password.module').then(
            (m) => m.AuthResetPasswordModule
          ),
      },
      {
        path: 'sign-out',
        loadChildren: () =>
          import('app/auth/sign-out/sign-out.module').then(
            (m) => m.AuthSignOutModule
          ),
      },
    ],
  },
];
