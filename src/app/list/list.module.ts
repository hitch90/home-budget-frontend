import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
    imports: [CommonModule, RouterModule, FontAwesomeModule, SharedModule, NgxDatatableModule],
    declarations: [ListComponent]
})
export class ListModule {}
