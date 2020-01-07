import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../services/auth.service';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate : [AuthGuardService],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
