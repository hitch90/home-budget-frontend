import { Component, Input, OnInit } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';
import { ICategory } from '../../interfaces/category';
import { forkJoin, Observable } from 'rxjs';
import { generateColor } from '../../helpers/color-generator';
import { formatValue } from '../../helpers/format-value';

@Component({
    selector: 'app-category-balance',
    templateUrl: './category-balance.component.html',
    styleUrls: ['./category-balance.component.scss']
})
export class CategoryBalanceComponent implements OnInit {
    @Input() category: ICategory;
    data: Observable<any>[] = [];
    balance = 0;
    constructor(
        private incomeService: IncomeService,
        private expenseService: ExpenseService
    ) {}

    ngOnInit() {
        this.data.push(this.expenseService.findByCategory(this.category.id));
        this.data.push(this.incomeService.findByCategory(this.category.id));
        this.randomColor();
        this.calcBalance();
    }

    calcBalance() {
        forkJoin(this.data).subscribe((res: any[]) => {
            const expenses: any = res[0];
            const incomes: any = res[1];
            if (expenses) {
                this.calc(expenses, 'expense');
            }
            if (incomes) {
                this.calc(incomes);
            }
        });
    }
    calc(arr, type = 'income') {
        for (const item of arr) {
            if (type === 'income') {
                this.balance += item.value;
            } else if (type === 'expense') {
                this.balance -= item.value;
            }
        }
    }
    
    randomColor() {
        const colors = ['#000', '#333', '#004C9A', '#ff6200', '#0DB1E6', 'var(--teal)', 'var(--primary)', 'var(--dark)', '#4557F5'];
        this.category.color =  colors[(Math.random() * 10).toFixed(0)];
    }
    
    formatVal(val) {
        return formatValue(val < 0 ? val * -1 : val);
    }
}
