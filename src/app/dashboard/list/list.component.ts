import { Component, Input, OnInit } from '@angular/core';
import dayjs = require('dayjs');
import { formatValue } from '../../helpers/format-value';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @Input() list: any[] = null;
    @Input() title: string;
    @Input() icon: string;
    constructor() {}

    ngOnInit() {}
    
    parseDate(date) {
        return dayjs(date).format('DD.MM');
    }
    
    formatVal(val) {
        return formatValue(val);
    }
}
