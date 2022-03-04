import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthSignInComponent } from './sign-in.component';

const routes: Route[] = [
  {
    path: '',
    component: AuthSignInComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthSignInRoutes {}
