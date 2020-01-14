import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ExpenseService } from '../../services/expense.service';
import dayjs = require('dayjs');
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-expense-list',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
    dateForm: FormGroup;
    displayedColumns: string[] = [
        'id',
        'category',
        'name',
        'value',
        'date',
        'account',
        'action'
    ];
    accounts$: Observable<any>;
    categories$: Observable<any>;
    dataSource: any;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private expenseService: ExpenseService,
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.loadList();
        this.dateForm = this.formBuild();
        this.accounts$ = this.accountService.findAll();
        this.categories$ = this.categoryService.findAll();
    }

    formBuild() {
        return this.formBuilder.group({
            from: ['', Validators.required],
            to: ['']
        });
    }

    loadList() {
        const currentMonth = new Date().getMonth() + 1;
        this.expenseService
            .findByMonth(currentMonth)
            .subscribe((data: any[]) => {
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.sort = this.sort;
            });
    }

    parseDate(date) {
        return dayjs(date).format('DD-MM-YYYY');
    }

    delete(id) {
        this.expenseService.delete(id).subscribe(() => this.loadList());
    }

    submit() {
        const dates = this.dateForm.getRawValue();
        dates.from = dayjs(dates.from).format('YYYY-MM-DD');
        dates.to = dayjs(dates.to).format('YYYY-MM-DD');
        this.expenseService
            .findByDates(dates.from, dates.to)
            .subscribe((data: any[]) => {
                this.dataSource.data = data;
                this.dataSource._updateChangeSubscription();
            });
    }

    selectAccount(account) {
        if (account.value) {
            this.expenseService.findByAccount(account.value).subscribe((data: any[]) => {
                this.dataSource.data = data;
                this.dataSource._updateChangeSubscription();
            });
        } else {
            this.loadList();
        }
    }    
    
    selectCategory(category) {
        if (category.value) {
            this.expenseService.findByCategory(category.value).subscribe((data: any[]) => {
                this.dataSource.data = data;
                this.dataSource._updateChangeSubscription();
            });
        } else {
            this.loadList();
        }
    }
}
