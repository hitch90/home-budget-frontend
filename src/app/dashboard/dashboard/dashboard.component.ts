import {Component, OnDestroy, OnInit} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { formatValue } from '../../helpers/format-value';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    balance$: Subscription;
    balance = 0;
    balanceLoading = true;
    constructor(private accountService: AccountService) {}

    ngOnInit(): void {
        this.balance$ = this.accountService.balance().subscribe(data => {
            this.balance = data;
            this.balanceLoading = false;
        });
    }
    ngOnDestroy(): void {
        this.balance$.unsubscribe();
    }

    formatVal(): number {
        return formatValue(this.balance);
    }
}
