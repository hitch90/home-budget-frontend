import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import {formatValue} from '../../helpers/format-value';

@Component({
    selector: 'app-account-table',
    templateUrl: './account-table.component.html',
    styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent implements OnInit, OnChanges {
    @Input() data: any = [];
    @Output() deleteItem = new EventEmitter();
    displayedColumns: string[] = ['id', 'name', 'currentValue', 'action'];
    dataSource: any;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
    }

    delete(id) {
        this.deleteItem.emit(id);
    }

    formatVal(val) {
        return formatValue(val);
    }
}
