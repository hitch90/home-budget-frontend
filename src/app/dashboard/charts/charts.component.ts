import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
// @ts-ignore
import ApexCharts from 'apexcharts';
import dayjs = require('dayjs');
import {forkJoin, Observable, Subscription} from 'rxjs';
import {ExpenseService} from '../../services/expense.service';
import {IncomeService} from '../../services/income.service';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, AfterViewInit {
    @ViewChild('chart', { static: true }) chartDiv: ElementRef;
    @Input() title = '';
    data: Observable<any>[] = [];
    currentYear = dayjs(new Date()).format('YYYY');
    dataByMonths: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    options = {
        series: [
            {
                name: '...',
                data: []
            }
        ],
        chart: {
            type: 'bar',
            height: 250
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: [
                'Sty',
                'Luty',
                'Mar',
                'Kw',
                'Maj',
                'Czer',
                'Lip',
                'Sie',
                'Wrz',
                'Paz',
                'Lis',
                'Gr'
            ]
        },
        yaxis: {
            title: {
                text: 'PLN'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + ' zł';
                }
            }
        }
    };

    constructor(
        private expenseService: ExpenseService,
        private incomeService: IncomeService
    ) {}

    ngAfterViewInit() {
        forkJoin(this.data).subscribe((res) => {
            const expenses: any = res[0];
            const incomes: any = res[1];
            if (expenses) {
                this.calc(expenses, 'expense');
            }
            if (incomes) {
                this.calc(incomes);
            }
            this.options.series[0].data = this.dataByMonths;
            const chart = new ApexCharts(
                this.chartDiv.nativeElement,
                this.options
            );
            chart.render();
        });
    }

    ngOnInit() {
        this.data.push(this.expenseService.findByMonth(new Date().getMonth() + 1));
        this.data.push(this.incomeService.findByMonth(new Date().getMonth() + 1));
    }
    
    calc(arr, type = 'income') {
        const valuesArr = this.dataByMonths;
        for (const item of arr) {
            const itemMonth = dayjs(item.date).format('MM');
            const itemYear = dayjs(item.date).format('YYYY');
            if (itemYear === this.currentYear) {
                if (type === 'income') {
                    valuesArr[parseInt(itemMonth, 10) - 1] += item.value;
                } else if (type === 'expense') {
                    valuesArr[parseInt(itemMonth, 10) - 1] -= item.value;
                }
            }
        }
        this.dataByMonths = valuesArr.map(item => parseInt(item, 10));
    }
}
