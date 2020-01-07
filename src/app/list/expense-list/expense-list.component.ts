import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ExpenseService } from '../../services/expense.service';
import dayjs = require('dayjs');
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    dataSource: any;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private expenseService: ExpenseService, private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.loadList();
        this.dateForm = this.formBuild();
    }

    formBuild() {
        return this.formBuilder.group({
            from: ['', Validators.required],
            to: [''],
        });
    }
    
    loadList() {
        this.expenseService.findAll().subscribe((data: any[]) => {
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
        this.expenseService.findByDates(dates.from, dates.to).subscribe((data: any[]) => {
            this.dataSource.data = data;
            this.dataSource._updateChangeSubscription();
        });
    }
}
