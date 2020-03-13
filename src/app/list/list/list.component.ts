import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { IncomeService } from '../../services/income.service';
import { switchMap, map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import Swal from 'sweetalert2';
import {ICategory} from '../../interfaces/category';
import {CategoryService} from '../../services/category.service';
import {combineLatest} from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    loading = true;
    categories$;
    categories = [];
    tableData = [];
    barChartData = [];
    title = '';
    constructor(
        private route: ActivatedRoute,
        private expenseService: ExpenseService,
        private incomeService: IncomeService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(switchMap((params: any) => this.getList(params)))
            .subscribe(
                (data: any) => {
                    this.loading = false;
                    this.tableData = data.list;
                    this.getCategories();
                },
                err => {
                    this.loading = false;
                    this.tableData = [];
                    Swal.fire({
                        title: 'Błąd pobierania danych!',
                        text:
                            'Wystąpił błąd z pobraniem danych. Sprawdź połączenie lub spróbuj ponownie później.',
                        icon: 'error'
                    });
                }
            );
    }

    getList({ params }) {
        let filters = {};
        this.route.queryParamMap.subscribe((query: any) => {
            filters = query.params;
        });
        this.loading = true;
        switch (params.type) {
            case 'expenses':
                this.title = 'Wydatki';
                this.getBalanceInMonths('expenses', this.expenseService.getExpensesInMonths());
                return this.expenseService.getExpenses(filters);
            case 'incomes':
                this.title = 'Przychody'
                this.getBalanceInMonths('incomes', this.incomeService.getIncomesInMonths());
                return this.incomeService.getIncomes(filters);
        }
    }

    parseDate(date) {
        return dayjs(date).format('DD/MM/YYYY');
    }    
    
    getCategories(): void {
        this.categories$ = this.categoryService
            .findAll()
            .pipe(map(categories => categories.map(item => {
                item.sum = 0;
                item.expenses.map(exp => item.sum += Math.floor(exp.value));
                return item;
            })))
            .subscribe((data: any) => {
                console.log(data);
                this.categories = data;
            });
    }

    getBalanceInMonths(key, service) {
        service.subscribe((data: any) => {
            this.barChartData = data;
        });
    }
}
