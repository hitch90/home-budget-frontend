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
import { forkJoin, Observable } from 'rxjs';
import { RefillService } from '../../services/refill.service';

@Component({
    selector: 'app-refill-chart',
    templateUrl: './refill-chart.component.html',
    styleUrls: ['./refill-chart.component.scss']
})
export class RefillChartComponent implements OnInit, AfterViewInit {
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
            type: 'area',
            height: 250
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 4,
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
                text: 'l/100km'
            }
        },
        fill: {
            opacity: 1
        },
    };

    constructor(private refillService: RefillService) {}

    ngAfterViewInit() {
        forkJoin(this.data).subscribe(res => {
            res.map(
                (item, index) => (this.dataByMonths[index] = item.consumption)
            );
            this.options.series[0].data = this.dataByMonths;
            const chart = new ApexCharts(
                this.chartDiv.nativeElement,
                this.options
            );
            chart.render();
        });
    }

    ngOnInit() {
        this.dataByMonths.map((i, index) =>
            this.data.push(this.refillService.consumptionByMonth(index + 1))
        );
    }

    calc(arr) {
        const valuesArr = this.dataByMonths;
        for (const item of arr) {
            const itemMonth = dayjs(item.date).format('MM');
            const itemYear = dayjs(item.date).format('YYYY');
            if (itemYear === this.currentYear) {
                valuesArr[parseInt(itemMonth, 10) - 1] -= item.value;
            }
        }
        this.dataByMonths = valuesArr.map(item => parseInt(item, 10));
    }
}
