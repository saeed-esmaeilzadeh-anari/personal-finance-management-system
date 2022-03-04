import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    declarations: [DashboardComponent, ],
    imports: [CommonModule, SharedModule, DashboardRoutingModule],
    exports: [DashboardComponent, ],
})
export class DashboardModule {}
