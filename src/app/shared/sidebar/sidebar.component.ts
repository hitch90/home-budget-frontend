import { Component, OnInit } from '@angular/core';
import { sidebarMenu } from './sidebar';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    menu = sidebarMenu;
    constructor() {}

    ngOnInit(): void {}
}
