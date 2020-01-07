import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeListComponent } from './income-list/income-list.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AccountListComponent } from './account-list/account-list.component';
import { ListPageComponent } from './list-page/list-page.component';
const routes: Routes = [
    {
        path: 'list',
        component: ListPageComponent,
        children: [
            {
                path: 'income',
                component: IncomeListComponent
            },
            {
                path: 'expense',
                component: ExpenseListComponent
            },
            {
                path: 'account',
                component: AccountListComponent
            },
            {
                path: 'category',
                component: CategoryListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListRoutingModule {}
