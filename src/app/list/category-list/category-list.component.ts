import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { IExpanse } from '../../interfaces/expanse';
import { ICategory } from '../../interfaces/category';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
    dataTable: any = [];

    constructor(private categoryService: CategoryService) {}

    ngOnInit() {
        this.loadList();
    }

    delete(id) {
        this.categoryService.delete(id).subscribe(() => this.loadList());
    }

    loadList() {
        this.categoryService
            .findAll()
            .subscribe((data: ICategory[]) => (this.dataTable = data));
    }
}
