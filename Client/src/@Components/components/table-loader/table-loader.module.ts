import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLoaderComponent } from './table-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [TableLoaderComponent],
  exports: [TableLoaderComponent],
})
export class TableLoaderModule {}
