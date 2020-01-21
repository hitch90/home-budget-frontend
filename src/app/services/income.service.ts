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
    
    findByDates(from, to) {
        return this.httpClient.get(this.incomesRoute + `?date_start=${from}&date_end=${to}`);
    }

    findByMonth(month) {
        return this.httpClient.get(this.incomesRoute + `?month=${month}`);
    }
    
    findByCategory(id) {
        return this.httpClient.get(this.incomesRoute + `?category=${id}`);
    }
    
    findOne(id: number) {
        return this.httpClient.get(this.incomeRoute + '/' + id);
    }
    
    delete(id: number) {
        return this.httpClient.delete(this.incomeRoute + `/${id}`);
    }
    
    create(income) {
        return this.httpClient.post(this.incomeRoute, income);
    }
}
