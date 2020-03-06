import { Component, Input, OnInit } from '@angular/core';
import { IExpanse } from '../../interfaces/expanse';

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
    @Input() expense: IExpanse;
    constructor() {}

    ngOnInit(): void {
        console.log(this.expense);
    }
}
