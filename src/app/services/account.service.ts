import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable, Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private accountsRoute =
        environment.api_url + '/' + environment.routes.accounts;
    constructor(private httpClient: HttpClient) {}

    findAll(): Observable<any> {
        return this.httpClient.get(this.accountsRoute);
    }

    findOne(id: number): Observable<any> {
        return this.httpClient.get(this.accountsRoute + '/' + id);
    }

    create(account): Observable<any> {
        return this.httpClient.post(this.accountsRoute, account);
    }
    
    delete(id): Observable<any> {
        return this.httpClient.delete(this.accountsRoute + '/' + id);
    }
    
    balance(): Observable<any> {
        return this.httpClient.get(this.accountsRoute + '/balance');
    }
    
    transfer(body): Observable<any> {
        return this.httpClient.post(this.accountsRoute + '/transfer', body);
    }
}
