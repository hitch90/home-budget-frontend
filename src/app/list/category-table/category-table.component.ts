import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit, OnChanges {
    @Input() data: any = [];
    @Output() deleteItem = new EventEmitter();
    displayedColumns: string[] = [
        'id',
        'name',
        'image',
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

    delete(id) {
        this.deleteItem.emit(id);
    }
}
