import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMessageComponent } from './alert-message.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertMessageComponent],
  exports: [AlertMessageComponent],
})
export class AlertMessageModule {}
