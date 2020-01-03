import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlertComponent } from './alert/alert.component';

@NgModule({
    imports: [CommonModule, RouterModule, BrowserAnimationsModule],
    declarations: [HeaderComponent, FooterComponent, NavComponent, AlertComponent],
    exports: [HeaderComponent, FooterComponent, NavComponent, AlertComponent]
})
export class SharedModule {}
