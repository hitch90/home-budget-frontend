import {Component, OnDestroy, OnInit} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { formatValue } from '../../helpers/format-value';
import { Subscription } from 'rxjs';
import {ExpenseService} from '../../services/expense.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    balance$: Subscription;
    balance = 0;
    balanceLoading = true;
    expenses = {
        current: 0,
        last: 0,
    };
    constructor(private accountService: AccountService, private expenseService: ExpenseService) {}

    ngOnInit(): void {
        this.balance$ = this.accountService.balance().subscribe(data => {
            this.balance = data;
            this.balanceLoading = false;
        });
        this.getCurrentMonthExpensesSum();
        this.getLastMonthExpensesSum();

    }
    
    ngOnDestroy(): void {
        this.balance$.unsubscribe();
    }
    
    getCurrentMonthExpensesSum() {
        const date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        if (month === 0) {
            month = 11;
            year -= 1;
        }
        this.getSum('current', month, year);
    }
    
    getLastMonthExpensesSum() {
        const date = new Date();
        let month = date.getMonth() - 1;
        let year = date.getFullYear();
        if (month === 0) {
            month = 11;
            year -= 1;
        }
        this.getSum('last', month, year);
    }
    
    getSum(key, month, year) {
        this.expenseService.getExpenses({ month: month + 1, year }).subscribe(data => {
            this.expenses[key] = this.formatVal(data['sum']);
        });
    }

    formatVal(val): number {
        return formatValue(val);
    }
}
