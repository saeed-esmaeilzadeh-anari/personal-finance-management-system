import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FuseConfirmationService } from '@Components/services/confirmation/confirmation.service';
import { FuseConfirmationDialogComponent } from '@Components/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FuseConfirmationDialogComponent],
  imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule],
  providers: [FuseConfirmationService],
})
export class FuseConfirmationModule {
  /**
   * Constructor
   */
  constructor(private _fuseConfirmationService: FuseConfirmationService) {}
}
