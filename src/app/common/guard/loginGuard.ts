import {  CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot,  Router} from "@angular/router";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/services/localStorageService/local-storage.service";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router,
              private localStorageService: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    let token = this.localStorageService.token;
    if (token !== '') 
      return true;

    this.router.navigate(['/']);
    return false;
  }
}