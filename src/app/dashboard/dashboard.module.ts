import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { AccountWidgetComponent } from './account-widget/account-widget.component';
import { ChartsComponent } from './charts/charts.component';
import {MatProgressBarModule} from '@angular/material';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, BrowserAnimationsModule, MatProgressBarModule],
    declarations: [DashboardComponent, ListComponent, AccountWidgetComponent, ChartsComponent],
    exports: []
})
export class DashboardModule {}
