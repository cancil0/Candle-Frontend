import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/common/result/result.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName: string = '';
  userNameSurname: string = '';
  email: string = '';
  userId: string = '';

  constructor(private router: Router,
              private http : HttpClient) { }

  changeUserName(data: string) {
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

  activateUser(userName:string):Observable<Result>{
    let options = {
      headers : new HttpHeaders()
                .set('Content-Type', 'application/json')
    }
    const url : string = `${environment.apiUrl}api/User/ActivateUser?userName=${userName}`;
    return this.http.put<Result>(url,null,options);
  }

}