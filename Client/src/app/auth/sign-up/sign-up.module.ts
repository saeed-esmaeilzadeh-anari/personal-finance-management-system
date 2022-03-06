import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignUpComponent } from 'app/auth/sign-up/sign-up.component';
import { authSignupRoutes } from 'app/auth/sign-up/sign-up.routing';
import { FuseCardModule } from '@Components/components/card';
import { FuseAlertModule } from '@Components/components/alert';

@NgModule({
  declarations: [AuthSignUpComponent],
  imports: [
    RouterModule.forChild(authSignupRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseCardModule,
    FuseAlertModule,
    SharedModule,
  ],
})
export class AuthSignUpModule {}
