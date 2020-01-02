import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, BrowserAnimationsModule],
    declarations: [DashboardComponent, ListComponent],
    exports: []
})
export class DashboardModule {}
