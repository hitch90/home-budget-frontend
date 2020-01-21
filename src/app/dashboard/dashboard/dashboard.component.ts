import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Observable } from 'rxjs';
import { IncomeService } from '../../services/income.service';
import { IExpanse } from '../../interfaces/expanse';
import { AccountService } from '../../services/account.service';
import { ICategory } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    expenses$: Observable<IExpanse[]>;
    income$: Observable<any>;
    accounts$: Observable<any>;
    category$: Observable<ICategory[]>;
    constructor(
        private expenseService: ExpenseService,
        private incomeService: IncomeService,
        private accountService: AccountService,
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.expenses$ = this.expenseService.findAll(5);
        this.income$ = this.incomeService.findAll(5);
        this.accounts$ = this.accountService.findAll();
        this.category$ = this.categoryService.findAll();
    }
    
    deleteAccount(id) {
        this.accountService.delete(id).subscribe(() => {
            console.log('OK');
            this.accounts$ = this.accountService.findAll();
        });
    }
}
