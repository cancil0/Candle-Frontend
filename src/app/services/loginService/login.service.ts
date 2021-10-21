import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultData } from 'src/app/models/common/result/resultData.model';
import { UserLoginDto } from 'src/app/models/login/userLoginDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  login(userLoginDto:UserLoginDto):Observable<ResultData<string>>{
    const url : string = `${environment.apiUrl}api/Login/Login`;
    let options = {
      headers : new HttpHeaders()
                .set('Content-Type', 'application/json')
    }
    return this.http.post<ResultData<string>>(url,userLoginDto,options);
  }

}
