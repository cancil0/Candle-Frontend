import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { UserService } from "src/app/services/userService/user.service";

@Injectable()
export class LoginGuard implements CanActivate {
	
	constructor(private userService: UserService) {}

	canActivate() {
	  return this.userService.isLoggedIn();
	}
}