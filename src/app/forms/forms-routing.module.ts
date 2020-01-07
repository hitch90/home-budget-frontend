import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { AuthGuardService } from '../services/auth.service';

const routes: Routes = [
    {
        path: 'add',
        component: FormsComponent,
        canActivate : [AuthGuardService],
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
            },
            {
                path: 'category',
                component: CategoryFormComponent
            },
            {
                path: 'transfer',
                component: TransferFormComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormsRoutingModule {}
