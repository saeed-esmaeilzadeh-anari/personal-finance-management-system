import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableActionBtnComponent } from './table-action-btn.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [CommonModule, MatIconModule, RouterModule, MatRippleModule],
  declarations: [TableActionBtnComponent],
  exports: [TableActionBtnComponent],
})
export class TableActionBtnModule {}
