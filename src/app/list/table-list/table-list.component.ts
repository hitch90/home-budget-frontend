import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import dayjs = require('dayjs');

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnChanges {
    @Input() data: any = [];
    @Output() deleteItem = new EventEmitter();
    displayedColumns: string[] = [
        'id',
        'category',
        'name',
        'value',
        'date',
        'account',
        'action'
    ];
    dataSource: any;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor() {}

    ngOnInit() {}
    
    ngOnChanges() {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
    }

    parseDate(date) {
        return dayjs(date).format('DD-MM-YYYY');
    }
    
    delete(id) {
        this.deleteItem.emit(id);
    }
}
