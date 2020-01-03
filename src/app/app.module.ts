import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from './forms/forms.module';
import { FormsRoutingModule } from './forms/forms-routing.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        DashboardModule,
        DashboardRoutingModule,
        FormsModule,
        FormsRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
