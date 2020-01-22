import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ExpenseService } from '../../services/expense.service';
import dayjs = require('dayjs');
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { CategoryService } from '../../services/category.service';
import {formatValue} from '../../helpers/format-value';
import {IExpanse} from '../../interfaces/expanse';

@Component({
    selector: 'app-expense-list',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
    expensesSum = 0;
    expensesSumFilter = 0;
    accounts$: Observable<any>;
    categories$: Observable<any>;
    dataTable: any = [];

    constructor(
        private expenseService: ExpenseService,
        private accountService: AccountService,
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.loadList();
        this.accounts$ = this.accountService.findAll();
        this.categories$ = this.categoryService.findAll();
    }

    loadList() {
        const currentMonth = new Date().getMonth() + 1;
        this.expenseService
            .findByMonth(currentMonth)
            .subscribe((data: IExpanse[]) => {
                this.dataTable = data;
                data.map(item => this.expensesSum += item.value);
            });
    }

    formatVal(val) {
        return formatValue(val);
    }

    delete(id) {
        this.expenseService.delete(id).subscribe(() => this.loadList());
    }
    
    submit(filters) {
        this.expensesSumFilter = 0;
        this.expenseService.getByFilters(filters).subscribe((data: IExpanse[]) => {
            this.dataTable = data;
            data.map(item => this.expensesSumFilter += item.value);
        });
    }
}
