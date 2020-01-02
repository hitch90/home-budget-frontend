import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private expensesRoute =
        environment.api_url + '/' + environment.routes.expenses; 
    private expenseRoute =
        environment.api_url + '/' + environment.routes.expense;
    constructor(private httpClient: HttpClient) {}

    findAll(limit = 0) {
        return this.httpClient.get(this.expensesRoute + `?limit=${limit}`);
    }

    findOne(id: number) {
        return this.httpClient.get(this.expenseRoute + '/' + id);
    }
}
