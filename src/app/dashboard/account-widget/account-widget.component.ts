import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-account-widget',
    templateUrl: './account-widget.component.html',
    styleUrls: ['./account-widget.component.scss']
})
export class AccountWidgetComponent implements OnInit {
    @Input() account: any;
    @Output() delete = new EventEmitter();
    constructor() {}

    ngOnInit() {}

    deleteEv() {
        this.delete.emit(this.account.id);
    }
}
