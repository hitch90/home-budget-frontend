import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { formatValue } from '../../helpers/format-value';
import { Subscription } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import { map } from 'rxjs/operators';
import { ICategory } from '../../interfaces/category';

interface MonthYear {
    month: number;
    year: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    balance$: Subscription;
    balance = 0;
    balanceLoading = true;
    expenses$: Subscription;
    expenses = {
        current: 0,
        last: 0
    };
    categories$: Subscription;
    categories: ICategory[];

    constructor(
        private accountService: AccountService,
        private expenseService: ExpenseService,
        private categoryService: CategoryService,
    ) {}

    ngOnInit(): void {
        this.balance$ = this.accountService.balance().subscribe(data => {
            this.balance = data;
            this.balanceLoading = false;
        });
        this.accountService.findAll().subscribe(acc => {
            
        })
        this.getCurrentMonthExpensesSum();
        this.getLastMonthExpensesSum();
        this.getCategories();
    }

    ngOnDestroy(): void {
        this.balance$.unsubscribe();
    }

    getCurrentMonthExpensesSum(): void {
        const { month, year } = this.getMonthAndYear(0);
        this.getSum('current', month, year);
    }

    getLastMonthExpensesSum(): void {
        const { month, year } = this.getMonthAndYear(1);
        this.getSum('last', month, year);
    }

    getSum(key, month, year): void {
        this.expenses$ = this.expenseService
            .getExpenses({ month: month + 1, year })
            .subscribe(data => {
                this.expenses[key] = this.formatVal(data['sum']);
            });
    }

    private formatVal(val): number {
        return formatValue(val);
    }

    private getMonthAndYear(mod): MonthYear {
        const date = new Date();
        let month = date.getMonth() - mod;
        let year = date.getFullYear();
        if (month === 0) {
            month = 11;
            year -= 1;
        }
        return { month, year };
    }

    getCategories(): void {
        this.categories$ = this.categoryService
            .findAll()
            .pipe(
                map((cat: ICategory[]) => {
                    cat.map((item: ICategory) => {
                        this.expenseService
                            .getExpenses({
                                category: item.id,
                                ...this.getMonthAndYear(-1)
                            })
                            .subscribe((data: any) => {
                                item.sum = data.sum;
                            });
                    });
                    return cat;
                })
            )
            .subscribe((data: any) => {
                console.log(data);
                this.categories = data;
            });
    }
}
