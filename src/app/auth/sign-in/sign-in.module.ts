import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@Components/components/card';
import { FuseAlertModule } from '@Components/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignInComponent } from './sign-in.component';
import { AuthSignInRoutes } from './sign-in.routing';

@NgModule({
  declarations: [AuthSignInComponent],
  imports: [
    AuthSignInRoutes,
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
export class AuthSignInModule {}
