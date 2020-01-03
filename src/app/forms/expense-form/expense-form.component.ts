import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';

@Component({
    selector: 'app-expense-form',
    templateUrl: './expense-form.component.html',
    styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {
    expenseForm: FormGroup;
    status: string;
    constructor(
        private formBuilder: FormBuilder,
        private expenseService: ExpenseService
    ) {}

    ngOnInit() {
        this.expenseForm = this.buildForm();
    }

    private buildForm() {
        return this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            category: ['', Validators.required],
            image: [''],
            value: [0, Validators.required],
            currency: ['pln', Validators.required]
        });
    }

    submit() {
        this.expenseService.create(this.expenseForm.getRawValue()).subscribe(
            () => (this.status = 'ok'),
            () => (this.status = 'not-ok')
        );
    }
}
