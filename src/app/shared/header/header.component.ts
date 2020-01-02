import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ opacity: 0 }),
                        animate('0.3s ease-out',
                            style({ opacity: 1 }))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ opacity: 1 }),
                        animate('0.3s ease-in',
                            style({ opacity: 0 }))
                    ]
                )
            ]
        )
    ]
})
export class HeaderComponent implements OnInit {
    addNav = false;
  constructor() { }

  ngOnInit() {
  }
  
  toggleAddNav() {
      this.addNav = !this.addNav;
  }

}
