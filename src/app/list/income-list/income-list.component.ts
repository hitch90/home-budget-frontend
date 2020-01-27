import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import dayjs = require('dayjs');
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {formatValue} from '../../helpers/format-value';
import {IExpanse} from '../../interfaces/expanse';
import {Observable} from 'rxjs';
import {AccountService} from '../../services/account.service';
import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-income-list',
    templateUrl: './income-list.component.html',
    styleUrls: ['./income-list.component.scss']
})
export class IncomeListComponent implements OnInit {
    incomesSum = 0;
    incomesSumFilter = 0;
    accounts$: Observable<any>;
    categories$: Observable<any>;
    dataTable: any = [];

    constructor(
        private incomeService: IncomeService,
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
        this.incomeService
            .findByMonth(currentMonth)
            .subscribe((data: IExpanse[]) => {
                this.dataTable = data;
                data.map(item => this.incomesSum += item.value);
            });
    }

    delete(id) {
        this.incomeService.delete(id).subscribe(() => this.loadList());
    }

    submit(filters) {
        this.incomesSumFilter = 0;
        this.incomeService.getByFilters(filters).subscribe((data: IExpanse[]) => {
            this.dataTable = data;
            data.map(item => this.incomesSumFilter += item.value);
        });
    }
    
    formatVal(val) {
        return formatValue(val);
    }
}
