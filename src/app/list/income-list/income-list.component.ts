import { Component, OnInit, ViewChild } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { Observable } from 'rxjs';
import dayjs = require('dayjs');
import { MatTableDataSource, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-income-list',
    templateUrl: './income-list.component.html',
    styleUrls: ['./income-list.component.scss']
})
export class IncomeListComponent implements OnInit {
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

    constructor(private incomeService: IncomeService,         private formBuilder: FormBuilder,
    ) {}

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
        this.incomeService.findAll().subscribe((data: any[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
        });
    }

    parseDate(date) {
        return dayjs(date).format('DD-MM-YYYY');
    }
    
    delete(id) {
        this.incomeService.delete(id).subscribe(() => this.loadList());
    }
    
    submit() {
        const dates = this.dateForm.getRawValue();
        dates.from = dayjs(dates.from).format('YYYY-MM-DD');
        dates.to = dayjs(dates.to).format('YYYY-MM-DD');
        this.incomeService.findByDates(dates.from, dates.to).subscribe((data: any[]) => {
            this.dataSource.data = data;
            this.dataSource._updateChangeSubscription();
        });
    }
}
