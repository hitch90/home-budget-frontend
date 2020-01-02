import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
    private incomesRoute = environment.api_url + '/' + environment.routes.incomes;
    private incomeRoute = environment.api_url + '/' + environment.routes.income;
    constructor(
        private httpClient: HttpClient
    ) { }

    findAll(limit = 0) {
        return this.httpClient.get(this.incomesRoute + `?limit=${limit}`);
    }

    findOne(id: number) {
        return this.httpClient.get(this.incomeRoute + '/' + id);
    }
}
