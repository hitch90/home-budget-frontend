import { Component, OnInit } from '@angular/core';
import { RefillService } from 'src/app/services/refill.service';

@Component({
  selector: 'app-refill-list',
  templateUrl: './refill-list.component.html',
  styleUrls: ['./refill-list.component.scss']
})
export class RefillListComponent implements OnInit {
  consumption$;
  constructor(private refillService: RefillService) { }

  ngOnInit() {
    this.consumption$ = this.refillService.consumption();
  }

}
