import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ExpenseService } from '../../services/expense.service';
import { IncomeService } from '../../services/income.service';
import dayjs = require('dayjs');
import { formatValue } from '../../helpers/format-value';

@Component({
    selector: 'app-account-balance',
    templateUrl: './account-balance.component.html',
    styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent implements OnInit {
    balance = 0;
    income = 0;
    expense = 0;
    constructor(
        private accountService: AccountService,
        private expenseService: ExpenseService,
        private incomeService: IncomeService
        ) {}

    ngOnInit() {
        this.accountService.balance().subscribe(data => (this.balance = data));
        this.incomeService.findByMonth(dayjs().format('MM')).subscribe((data: any[]) => {
            data.map(item => {
                this.income += item.value;
            });
        });
        this.expenseService.findByMonth(dayjs().format('MM')).subscribe((data: any[]) => {
            data.map(item => {
                this.expense += item.value;
            });
        });
    }
    formatVal(val) {
        return formatValue(val);
    }
}
