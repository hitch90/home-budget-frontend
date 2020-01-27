import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
    dataTable: any = [];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.loadList();
    }

    delete(id) {
        this.accountService.delete(id).subscribe(() => this.loadList());
    }

    loadList() {
        this.accountService
            .findAll()
            .subscribe((data: any[]) => (this.dataTable = data));
    }
}
