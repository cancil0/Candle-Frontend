import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName: string = '';
  userNameSurname: string = '';
  email: string = '';
  userId: string = '';

  constructor(private router: Router) { }

  userNameChange(data: string) {
    this.userName = data
  }

  userNameSurnameChange(data: string) {
    this.userNameSurname = data
  }

  emailChange(data: string) {
    this.email = data
  }

  userIdChange(data: string) {
    this.userId = data
  }

  isLoggedIn(): boolean{
    if(this.userName !== '')
      return true;

    this.router.navigate(['/']);
    return false;
  }

}