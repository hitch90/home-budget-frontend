import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IExpanse } from '../interfaces/expanse';
import * as dayjs from 'dayjs';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private expensesRoute =
        environment.api_url + '/' + environment.routes.expenses;
    private expenseRoute =
        environment.api_url + '/' + environment.routes.expense;
    constructor(private httpClient: HttpClient) {}

    findAll(limit = 0): Observable<any> {
        return this.httpClient.get(this.expensesRoute + `?limit=${limit}`);
    }

    findByDates(from, to) {
        return this.httpClient.get(
            this.expensesRoute + `?date_start=${from}&date_end=${to}`
        );
    }

    findByAccount(id) {
        return this.httpClient.get(this.expensesRoute + `?account=${id}`);
    }

    findByCategory(id) {
        return this.httpClient.get(this.expensesRoute + `?category=${id}`);
    }

    findByMonth(month) {
        return this.httpClient.get(this.expensesRoute + `?month=${month}`);
    }

    findOne(id: number): Observable<any> {
        return this.httpClient.get(this.expenseRoute + '/' + id);
    }

    create(expense: IExpanse): Observable<any> {
        return this.httpClient.post(this.expenseRoute, expense);
    }

    delete(id: number) {
        return this.httpClient.delete(this.expenseRoute + `/${id}`);
    }

    getExpenses(filters) {
        const objectArray = Object.entries(filters);
        let query = '?filters=true';
        objectArray.forEach(([key, value], index) => {
            let val: any = value;
            if (key === 'from' || key === 'to') {
                val = dayjs(val).format('YYYY-MM-DD');
            }
            query = `${query}&${key}=${val}`;
        });
        return this.httpClient.get(this.expensesRoute + query);
    }
}
