import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from 'src/app/models/user/userDto.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user:any = null;
  public userSubject: BehaviorSubject<UserDto>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<UserDto>(this.user);
  }

  public get userValue(): UserDto {
    return this.userSubject.value;
  }

  logIn(email: string, password: string) {
    const url: string = `${environment.apiUrl}login`;
    const body: any = { email: email, password: password };
    return this.http.post<any>(url, body)
      .pipe(map(res => {
        const user: UserDto = {
          uid: res.userId, email: res.email, displayName: res.displayName, access_token: res.access_token, refresh_token: res.refresh_token
        };
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  refreshToken() {
    const url: string = `${environment.apiUrl}token`;

    const body: any = {
      token : this.userValue.refresh_token
    };

    return this.http.post<any>(url, body)
      .pipe(map((token) => {
        const user: UserDto = {
          uid: this.userValue.uid,
          displayName: this.userValue.displayName,
          email: this.userValue.email,
          access_token: token.access_token,
          refresh_token: this.userValue.refresh_token
        }
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  logout() {
    const url: string = `${environment.apiUrl}token/${this.userValue.refresh_token}`;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    this.http.delete<any>(url, options).subscribe();
    localStorage.removeItem('user');
    this.userSubject.next(this.user);    
  }

  isLogin():boolean{
    if(localStorage.getItem('user')){
      return true;
    }
    return false;
  }
}
