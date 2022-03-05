import { Route } from '@angular/router';
import { AuthSignOutComponent } from 'app/auth/sign-out/sign-out.component';

export const authSignOutRoutes: Route[] = [
  {
    path: '',
    component: AuthSignOutComponent,
  },
];
