import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { IncomeService } from '../../services/income.service';
import { switchMap, map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    expenses;
    loading = true;
    columns = [
        { prop: 'id', name: '#' },
        { prop: 'name', name: 'Nazwa'},
        { prop: 'description', name: 'Opis'},
        { prop: 'value', name: 'Wartość'},
        { prop: 'date', name: 'Data'},
        { prop: 'category.name', name: 'Kategoria'},
        { prop: 'account.name', name: 'Konto'},
    ];

    constructor(
        private route: ActivatedRoute,
        private expenseService: ExpenseService,
        private incomeService: IncomeService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap((params: any) => this.getList(params)),
            map((data: any) => {
                let exp = data.expenses;
                exp = exp.map(item => ({...item, date: this.parseDate(item.date)}));
                data.expenses = exp;
                return data;
            })
        ).subscribe((data: any) => {
            this.loading = false;
            this.expenses = data;
        });
    }

    getList({ params }) {
        switch (params.type) {
            case 'expenses':
                return this.expenseService.getExpenses();
            case 'incomes':
                return this.incomeService.getIncomes();
        }
    }
    
    parseDate(date) {
        return dayjs(date).format('DD/MM/YYYY');
    }
}
