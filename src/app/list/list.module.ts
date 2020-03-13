import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FiltersComponent } from './filters/filters.component';
import {TableModule} from 'primeng/table';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
    imports: [CommonModule, RouterModule, FontAwesomeModule, SharedModule, TableModule],
    declarations: [ListComponent, FiltersComponent, PieChartComponent, BarChartComponent]
})
export class ListModule {}
