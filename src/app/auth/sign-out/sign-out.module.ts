import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@Components/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignOutComponent } from 'app/auth/sign-out/sign-out.component';
import { authSignOutRoutes } from 'app/auth/sign-out/sign-out.routing';

@NgModule({
  declarations: [AuthSignOutComponent],
  imports: [
    RouterModule.forChild(authSignOutRoutes),
    MatButtonModule,
    FuseCardModule,
    SharedModule,
  ],
})
export class AuthSignOutModule {}
