import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule, MatSelectModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { AccountListComponent } from './account-list/account-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ListPageComponent } from './list-page/list-page.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatSortModule,
        MatTooltipModule,
        MatSelectModule
    ],
    declarations: [
        AccountListComponent,
        CategoryListComponent,
        IncomeListComponent,
        ExpenseListComponent,
        ListPageComponent
    ],
    exports: []
})
export class ListModule {}
