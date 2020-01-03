import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Observable } from 'rxjs';
import { IncomeService } from '../../services/income.service';
import { IExpanse } from '../../interfaces/expanse';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    expenses$: Observable<IExpanse[]>;
    income$: Observable<any>;
    constructor(
        private expenseService: ExpenseService,
        private incomeService: IncomeService
    ) {}

    ngOnInit() {
        this.expenses$ = this.expenseService.findAll(5);
        this.income$ = this.incomeService.findAll(5);
    }
}
