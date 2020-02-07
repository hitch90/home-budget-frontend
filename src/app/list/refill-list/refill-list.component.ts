import { Component, OnInit } from '@angular/core';
import { RefillService } from 'src/app/services/refill.service';
import { IExpanse } from '../../interfaces/expanse';
import { formatValue } from '../../helpers/format-value';

@Component({
    selector: 'app-refill-list',
    templateUrl: './refill-list.component.html',
    styleUrls: ['./refill-list.component.scss']
})
export class RefillListComponent implements OnInit {
    consumption$;
    consumptionLast$;
    dataTable: any = [];
    gasPrice = 0;
    totalCost = 0;
    constructor(private refillService: RefillService) {}

    ngOnInit() {
        this.consumption$ = this.refillService.consumption();
        this.consumptionLast$ = this.refillService.consumption('last');
        this.fuelPrice();
        this.loadList();
    }

    loadList() {
        this.refillService.findAll().subscribe((data: IExpanse[]) => {
            this.dataTable = data;
            data.map(item => this.totalCost += item.value);
        });
    }

    delete(id) {
        this.refillService.delete(id).subscribe(() => this.loadList());
    }

    submit(filters) {
        this.refillService
            .getByFilters(filters)
            .subscribe((data: IExpanse[]) => {
                this.dataTable = data;
            });
    }

    formatVal(val) {
        return formatValue(val);
    }
    
    fuelPrice() {
        this.refillService.fuelPrice().subscribe(data => {
            const myXML = new DOMParser().parseFromString(data, 'text/xml');
            const gasPrice = myXML.getElementsByTagName('gpp:gasoline')[0].textContent;
            this.gasPrice = parseFloat(gasPrice);
        });
    }

    calcRoutePrice(con) {
        return (parseFloat(con) * this.gasPrice).toFixed(2) + ' PLN';
    }

}
