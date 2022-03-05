import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseHighlightComponent } from '@Components/components/highlight/highlight.component';

@NgModule({
  declarations: [FuseHighlightComponent],
  imports: [CommonModule],
  exports: [FuseHighlightComponent],
})
export class FuseHighlightModule {}
