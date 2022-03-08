import { Route } from '@angular/router';
import { AuthResetPasswordComponent } from 'app/auth/reset-password/reset-password.component';

export const authResetPasswordRoutes: Route[] = [
  {
    path: '',
    component: AuthResetPasswordComponent,
  },
];
