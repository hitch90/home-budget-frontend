import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable, Subscription} from 'rxjs';
import {IExpanse} from '../interfaces/expanse';

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

    findOne(id: number): Observable<any> {
        return this.httpClient.get(this.expenseRoute + '/' + id);
    }

    create(expense: IExpanse): Observable<any> {
        return this.httpClient.post(this.expenseRoute, expense);
    }
}
