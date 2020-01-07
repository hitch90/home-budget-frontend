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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListModule } from './list/list.module';
import { ListRoutingModule } from './list/list-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth.service';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        DashboardModule,
        DashboardRoutingModule,
        FormsModule,
        FormsRoutingModule,
        ListModule,
        ListRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule {}
