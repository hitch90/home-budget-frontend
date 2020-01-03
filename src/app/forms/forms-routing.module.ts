import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { AccountFormComponent } from './account-form/account-form.component';

const routes: Routes = [
    {
        path: 'add',
        component: FormsComponent,
        children: [
            {
                path: 'income',
                component: IncomeFormComponent
            },
            {
                path: 'expense',
                component: ExpenseFormComponent
            },
            {
                path: 'account',
                component: AccountFormComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormsRoutingModule {}
