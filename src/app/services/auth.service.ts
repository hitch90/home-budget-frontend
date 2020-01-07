import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private _router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const isLogged = localStorage.getItem('status');
        const password = localStorage.getItem('password');
        if (!(isLogged && password === environment.password)) {
            this._router.navigate(['login']);
            return false;
        }
        return true;
    }
}
