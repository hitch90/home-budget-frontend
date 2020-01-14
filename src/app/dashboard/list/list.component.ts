import { Component, Input, OnInit } from '@angular/core';
import dayjs = require('dayjs');

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @Input() list: any[] = null;
    @Input() title: string;
    constructor() {}

    ngOnInit() {}
    
    parseDate(date) {
        return dayjs(date).format('DD.MM');
    }
}
