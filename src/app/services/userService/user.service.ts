import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName: string = '';
  userNameSurname: string = '';
  email: string = '';
  userId: string = '';

  constructor() { }

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

}