import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsComponent } from './forms/forms.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    declarations: [
        FormsComponent,
        IncomeFormComponent,
        ExpenseFormComponent,
        AccountFormComponent
    ],
    exports: []
})
export class FormsModule {}
