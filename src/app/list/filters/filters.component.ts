import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import dayjs = require('dayjs');

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
    @Output() submitFilters = new EventEmitter();
    accounts$: Observable<any>;
    categories$: Observable<any>;
    filterForm: FormGroup;
    
    constructor(
        private accountService: AccountService,
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit() {
        this.accounts$ = this.accountService.findAll();
        this.categories$ = this.categoryService.findAll();
        this.filterForm = this.formBuild();

    }
    
    formBuild() {
        return this.formBuilder.group({
            from: [dayjs().format('YYYY-MM-01'), Validators.required],
            to: [dayjs().format('YYYY-MM-DD'), Validators.required],
            category: [''],
            account: [''] 
        });
    }
    
    submit() {
        this.submitFilters.emit(this.filterForm.getRawValue());
    }
}
