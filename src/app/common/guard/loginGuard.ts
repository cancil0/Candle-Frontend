import {  CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot,  Router} from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    let token = localStorage.getItem('token') || '';
    if (token !== '') 
        return true;

    this.router.navigate(['/']);
    return false;
  }
}