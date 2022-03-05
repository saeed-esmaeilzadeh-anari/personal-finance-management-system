import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@Components/components/drawer';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { ClassicLayoutModule } from 'app/layout/layouts/vertical/classic/classic.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    MatIconModule,
    MatTooltipModule,
    FuseDrawerModule,
    SharedModule,
    EmptyLayoutModule,
    ClassicLayoutModule,
  ],
  exports: [LayoutComponent, EmptyLayoutModule, ClassicLayoutModule],
})
export class LayoutModule {}
