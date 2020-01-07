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
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, AfterViewInit {
    @ViewChild('chart', { static: true }) chartDiv: ElementRef;
    @Input() data;
    @Input() title = '';
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

    constructor() {}

    ngAfterViewInit() {
        forkJoin(this.data).subscribe((res) => {
            const expenses: any = res[0];
            const incomes: any = res[1];
            const valuesArr = this.dataByMonths;
            for (const item of expenses) {
                const itemMonth = dayjs(item.date).format('MM');
                const itemYear = dayjs(item.date).format('YYYY');
                if (itemYear === this.currentYear) {
                    valuesArr[parseInt(itemMonth, 10) - 1] -= item.value;
                }
            }

            for (const item of incomes) {
                const itemMonth = dayjs(item.date).format('MM');
                const itemYear = dayjs(item.date).format('YYYY');
                if (itemYear === this.currentYear) {
                    valuesArr[parseInt(itemMonth, 10) - 1] += item.value;
                }
            }
            this.dataByMonths = valuesArr.map(item => item.toFixed(2));;
            this.options.series[0].data = this.dataByMonths;
            const chart = new ApexCharts(
                this.chartDiv.nativeElement,
                this.options
            );
            chart.render();
            
        });
    }

    ngOnInit() {}
}
