import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BalanceComponent } from './balance/balance.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '../shared/shared.module';
import { StatsComponent } from './stats/stats.component';

@NgModule({
    imports: [CommonModule, RouterModule, FontAwesomeModule, SharedModule],
    declarations: [DashboardComponent, BalanceComponent, StatsComponent]
})
export class DashboardModule {}
